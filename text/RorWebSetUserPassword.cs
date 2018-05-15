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
using RorWeb.Helper;
using static RorWeb.Helper.UserManagement;
using System.Web.Security;

namespace RorWeb.OData
{
    public class RorWebSetUserPasswordAction : UrlAction
    {
        //we do not support HTML behavior
        public override string Uri
        {
            get { return null; }
        }

        public override bool IsHtmlOperation { get { return false; } }
        public override bool IsODataOperation { get { return true; } }
        public override bool CausesStateChange { get { return true; } }

        private ActionParameter[] _actionParameters = new[] { new ActionParameter("UserPsw", typeof(string), true), new ActionParameter("UserId", typeof(string), false), new ActionParameter("OldPsw", typeof(string), false) };
        public override ActionParameter[] ActionParameters { get { return _actionParameters; } }

        public override object Execute(Content content, params object[] parameters)
        {
            PswResultObject result = new PswResultObject();

            // Load user if we can
            string userPsw = parameters[0] as string;
            string userGuid = parameters[1] as string;
            string oldPsw = parameters[2] as string;

            // Check if caller user is in the proper group and gets target company
            // User must have been a member of Security Editors of the given company or a system administrator
            if (!string.IsNullOrWhiteSpace(userGuid))
            {
                Content loadedUserContent = null;
                using (new SystemAccount())
                {
                    loadedUserContent = Content.All.DisableAutofilters().Where(u => u.Type("RorWebUser") && (string)u["PasswordResetGuid"] == userGuid && (DateTime)u["RequestChangePasswDate"] >= DateTime.UtcNow.AddDays(-1)).FirstOrDefault();
                    if (loadedUserContent != null)
                    {
                        loadedUserContent["Enabled"] = true;
                        loadedUserContent["SetPasswordDate"] = DateTime.UtcNow;
                        loadedUserContent["PasswordResetGuid"] = string.Empty;
                        loadedUserContent["Password"] = userPsw;
                        loadedUserContent.Save();
                    }
                    else
                    {
                        // usser does not exist, but no problem
                    }

                    // We only response false, if eexception happens, if user does not exists it!s still true for security reason
                    result.success = true;
                }
            } else if (User.Current.IsAuthenticated && Membership.ValidateUser(User.Current.Name, oldPsw))
            {
                var loadedUserContent = Content.LoadByIdOrPath(User.Current.Path);
                loadedUserContent["Password"] = userPsw;
                loadedUserContent.Save();
                result.success = true;
            }
            else
            {
                throw new Exception("Valamit elfelejtettel!");
            }

            return JsonConvert.SerializeObject(result, new KeyValuePairConverter()); ;
        }        
    }

    public class PswResultObject
    {
        public bool success;
    }
}