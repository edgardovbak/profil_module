using SenseNet.ApplicationModel;
using SenseNet.ContentRepository;
using SenseNet.ContentRepository.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SenseNet.ContentRepository.Workspaces;
using System.Reflection;
using SenseNet.ContentRepository.Storage.Security;
using static RorWeb.Helper.UserManagement;
using RorWeb.Code.Utilities;
using System.Threading.Tasks;
using SenseNet.Portal.Virtualization;
using System.Web;

namespace RorWeb.OData
{
    public class RorWebSendChangePasswordMailAction : UrlAction
    {
        //we do not support HTML behavior
        public override string Uri
        {
            get { return null; }
        }

        public override bool IsHtmlOperation { get { return false; } }
        public override bool IsODataOperation { get { return true; } }
        public override bool CausesStateChange { get { return true; } }

        private ActionParameter[] _actionParameters = new[] { new ActionParameter("UserEmail", typeof(string), true) };
        public override ActionParameter[] ActionParameters { get { return _actionParameters; } }

        public const string EmailSettingsName = "EmailUtilities";

        // Technical Debt: should be named ForgottenMail

        public override object Execute(Content content, params object[] parameters)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();

            // Load user if we can
            string useremail = parameters[0] as string;

            // Check if caller user is in the proper group and gets target company
            // User must have been a member of Security Editors of the given company or a system administrator
            if (!string.IsNullOrWhiteSpace(useremail))
            {
                Content loadedUserContent = null;
                using (new SystemAccount())
                {
                    loadedUserContent = Content.All.DisableAutofilters().Where(u => u.Type("RorWebUser") && (string)u["Email"] == useremail).FirstOrDefault();
                    if (loadedUserContent != null)
                    {
                        //loadedUserContent["Enabled"] = false; 
                        string confirmationGuid = Guid.NewGuid().ToString();
                        loadedUserContent["PasswordResetGuid"] = confirmationGuid;
                        loadedUserContent["RequestChangePasswDate"] = DateTime.UtcNow;
                        loadedUserContent.Save();

                        string fromEmail = Settings.GetValue<string>(EmailSettingsName, "EmailNotificationFrom");
                        var addresses = Settings.GetValue<string[]>(EmailSettingsName, "EmailNotificationTo");
                        string subject = Settings.GetValue<string>(EmailSettingsName, "EmailChangePassSubject");
                        // Technical Debt: guid msut be injected to email body
                        string emailTemplatePath = Settings.GetValue<string>(EmailSettingsName, "EmailForgottenBodyTemplatePath");
                        string emailTemplatePathForAdmin = Settings.GetValue<string>(EmailSettingsName, "EmailForgottenBodyTemplatePathForAdmin");
                        //emailTemplatePath = "/Root/Skins/rorweb/Templates/EmailTemplates/ConfirmationMail.html";
                        Node emailTemplateNode = Node.LoadNodeByIdOrPath(emailTemplatePath);
                        Node emailTemplateNodeForAdmin = Node.LoadNodeByIdOrPath(emailTemplatePathForAdmin);
                        string emailTemplate = emailTemplateNode?.GetBinaryToString();
                        string emailTemplateForAdmin = emailTemplateNodeForAdmin?.GetBinaryToString();
                        emailTemplate = emailTemplate.Replace("{User.UserName}", loadedUserContent["LoginName"] as string);
                        emailTemplate = emailTemplate.Replace("{User.DisplayName}", loadedUserContent["DisplayName"] as string);
                        emailTemplate = emailTemplate.Replace("{User.ConfirmationGuid}", loadedUserContent["PasswordResetGuid"] as string);
                        emailTemplate = emailTemplate.Replace("{Site.Url}", HttpContext.Current.Request.Url.Host);
                        emailTemplateForAdmin = emailTemplateForAdmin.Replace("{User.UserName}", loadedUserContent["LoginName"] as string);
                        emailTemplateForAdmin = emailTemplateForAdmin.Replace("{User.ConfirmationGuid}", loadedUserContent["PasswordResetGuid"] as string);
                        emailTemplateForAdmin = emailTemplateForAdmin.Replace("{Site.Url}", HttpContext.Current.Request.Url.Host);

                        string toEmail = loadedUserContent["Email"] as string;
                        if (string.IsNullOrWhiteSpace(toEmail))
                        {
                            toEmail = "jozsef.varga@sensenet.com";
                            subject = subject + " (no email!)";
                        }
                        

                        Parallel.ForEach(addresses, x =>
                        {
                            //bool validUser = SenseNet.ContentRepository.Content.All.DisableAutofilters().DisableLifespan().Any(c => c.TypeIs("User") && (string)c["Email"] == x.UserEmail);
                            //if (validUser)
                            {
                                EmailUtilities.SendEmail(
                                    new System.Net.Mail.MailAddress(fromEmail, fromEmail),
                                    x,
                                    null,
                                    subject,
                                    emailTemplateForAdmin);
                            }
                        });

                        EmailUtilities.SendEmail(
                            new System.Net.Mail.MailAddress(fromEmail, fromEmail),
                            toEmail,
                            null,
                            subject,
                            emailTemplate);
                    }
                    else
                    {
                        // usser does not exist, but no problem
                    }
                }
            }
            else
            {
                throw new Exception("Valamit elfelejtettel!");
            }

            return JsonConvert.SerializeObject(result, new KeyValuePairConverter()); ;
        }
    }
}