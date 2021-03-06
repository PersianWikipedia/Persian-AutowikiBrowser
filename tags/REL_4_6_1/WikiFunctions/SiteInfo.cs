/*
Copyright (C) 2008 Max Semenik

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
using System;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Serialization;

namespace WikiFunctions
{
    /// <summary>
    /// This class holds all basic information about a wiki
    /// </summary>
    [Serializable]
    public class SiteInfo : IXmlSerializable
    {
        private readonly bool php5;
        private string scriptPath;
        private readonly Dictionary<int, string> namespaces = new Dictionary<int, string>();
        private Dictionary<int, List<string>> namespaceAliases = new Dictionary<int, List<string>>();
        //private Dictionary<string, string> messageCache = new Dictionary<string, string>();
        private readonly Dictionary<string, List<string>> magicWords = new Dictionary<string, List<string>>();

        /// <summary>
        /// Creates an instance of the class
        /// </summary>
        /// <param name="scriptPath">URL where index.php and api.php reside</param>
        public SiteInfo(string scriptPath)
            : this(scriptPath, false)
        {
        }

        /// <summary>
        /// Creates an instance of the class
        /// </summary>
        /// <param name="scriptPath">URL where index.php and api.php reside</param>
        /// <param name="php5Ext"></param>
        public SiteInfo(string scriptPath, bool php5Ext)
        {
            ScriptPath = scriptPath;
            php5 = php5Ext;

            try
            {
                if (!LoadNamespaces())
                    throw new WikiUrlException();

                if (!LoadLocalisedMagicWordAliases())
                    throw new WikiUrlException();
            }
            catch (WikiUrlException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new WikiUrlException(ex);
            }
        }

        private static string Key(string scriptPath, bool php5Ext)
        {
            return "SiteInfo[" + scriptPath + "]@" + php5Ext;
        }

        public static SiteInfo CreateOrLoad(string scriptPath, bool php5Ext)
        {
            SiteInfo si = (SiteInfo)ObjectCache.Global.Get<SiteInfo>(Key(scriptPath, php5Ext));
            if (si != null) return si;

            si = new SiteInfo(scriptPath, php5Ext);
            ObjectCache.Global[Key(scriptPath, php5Ext)] = si;

            return si;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="scriptPath"></param>
        /// <param name="namespaces"></param>
        public SiteInfo(string scriptPath, Dictionary<int, string> namespaces)
        {
            ScriptPath = scriptPath;
            this.namespaces = namespaces;
        }

        internal SiteInfo()
        { }

        //private static void VerifyIntegrity()
        //{ }

        private string ApiPath
        {
            get { return scriptPath + "api.php" + ((php5) ? "5" : ""); }
        }

        public static string NormalizeURL(string url)
        {
            return (!url.EndsWith("/")) ? url + "/" : url;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool LoadNamespaces()
        {
            string output = Tools.GetHTML(ApiPath + "?action=query&meta=siteinfo&siprop=general|namespaces|namespacealiases|statistics&format=xml");

            XmlDocument xd = new XmlDocument();
            xd.LoadXml(output);

            if (xd["api"] == null || xd["api"]["query"] == null
                || xd["api"]["query"]["namespaces"] == null || xd["api"]["query"]["namespacealiases"] == null)
                return false;

            foreach (XmlNode xn in xd["api"]["query"]["namespaces"].GetElementsByTagName("ns"))
            {
                int id = int.Parse(xn.Attributes["id"].Value);

                if (id != 0) namespaces[id] = xn.InnerText + ":";
            }

            namespaceAliases = Variables.PrepareAliases(namespaces);

            foreach (XmlNode xn in xd["api"]["query"]["namespacealiases"].GetElementsByTagName("ns"))
            {
                int id = int.Parse(xn.Attributes["id"].Value);

                if (id != 0) namespaceAliases[id].Add(xn.InnerText);
            }

            return true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool LoadLocalisedMagicWordAliases()
        {
            string output = Tools.GetHTML(ApiPath + "?action=query&meta=siteinfo&siprop=magicwords&format=xml");

            //TODO:Remove post 1.14
            if (output.Contains("'siprop': magicwords"))
                return true;

            XmlDocument xd = new XmlDocument();
            xd.LoadXml(output);

            if (xd.GetElementsByTagName("api").Count != 1)
                return false;

            magicWords.Clear();

            // api / query existence is already checked
            if (xd["api"]["query"]["magicwords"] == null)
                return false;

            foreach (XmlNode xn in xd["api"]["query"]["magicwords"].GetElementsByTagName("magicword"))
            {
                List<string> alias = new List<string>();

                foreach (XmlNode xin in xn["aliases"].GetElementsByTagName("alias"))
                {
                    alias.Add(xin.InnerText);
                }

                magicWords.Add(xn.Attributes["name"].Value, alias);
            }

            return true;
        }

        //[XmlAttribute(AttributeName = "url")]
        public string ScriptPath
        {
            get { return scriptPath; }
            set //Must stay public otherwise Serialiser for ObjectCache isn't happy =(
            {
                scriptPath = NormalizeURL(value);
            }
        }

        public Dictionary<int, string> Namespaces
        { get { return namespaces; } }

        public Dictionary<int, List<string>> NamespaceAliases
        { get { return namespaceAliases; } }

        public Dictionary<string, List<string>> MagicWords
        { get { return magicWords; } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="names"></param>
        /// <returns></returns>
        public Dictionary<string, string> GetMessages(params string[] names)
        {
            string output = Tools.GetHTML(ApiPath + "?format=xml&action=query&meta=allmessages&ammessages=" + string.Join("|", names));

            XmlDocument xd = new XmlDocument();
            xd.LoadXml(output);

            Dictionary<string, string> result = new Dictionary<string, string>(names.Length);

            foreach (XmlNode xn in xd.GetElementsByTagName("message"))
            {
                result[xn.Attributes["name"].Value] = xn.InnerText;
            }

            return result;
        }

        #region Service functions
        #endregion

        #region IXmlSerializable Members

        public System.Xml.Schema.XmlSchema GetSchema()
        {
            return null;
        }

        public void ReadXml(XmlReader reader)
        {
            throw new Exception("The method or operation is not implemented.");
        }

        public void WriteXml(XmlWriter writer)
        {
            //writer.WriteStartElement("site");
            writer.WriteAttributeString("url", scriptPath);
            writer.WriteAttributeString("php5", php5 ? "1" : "0");
            {
                writer.WriteStartElement("Namespaces");
                {
                    foreach (KeyValuePair<int, string> p in namespaces)
                    {
                        writer.WriteStartElement("Namespace");
                        writer.WriteAttributeString("id", p.Key.ToString());
                        writer.WriteValue(p.Value);
                        writer.WriteEndElement();
                    }
                }
            }
            //writer.WriteEndElement();
        }
        #endregion
    }

    public class WikiUrlException : Exception
    {
        public WikiUrlException()
            : base("Can't connect to given wiki site.")
        { }

        public WikiUrlException(Exception innerException)
            : base("Can't connect to given wiki site.", innerException)
        { }
    }
}
