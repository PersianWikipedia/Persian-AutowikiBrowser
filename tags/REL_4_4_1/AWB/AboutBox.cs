/*
Autowikibrowser
Copyright (C) 2007 Martin Richards
(C) 2007 Stephen Kennedy (Kingboyk) http://www.sdk-software.com/

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
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using System.Reflection;
using System.Threading;
using WikiFunctions;

namespace AutoWikiBrowser
{
    internal sealed partial class AboutBox : Form
    {
        public AboutBox(string ieVersion, TimeSpan time, int Edits)
        {
            InitializeComponent();

            lblAWBVersion.Text = "Version " + Program.VersionString;
            lblRevision.Text = "SVN " + Variables.Revision;
            lblIEVersion.Text = "Internet Explorer version: " + ieVersion;
            txtWarning.Text = WikiFunctions.Controls.AboutBox.GetDetailedMessage(Assembly.GetExecutingAssembly());
            lblOSVersion.Text = "Windows version: " + Environment.OSVersion.Version.Major.ToString() + "." + Environment.OSVersion.Version.Minor.ToString();
            lblNETVersion.Text = ".NET version: " + Environment.Version.ToString();

            if (Edits == 0)
            {
                lblTimeAndEdits.Visible = true;

                lblTimeAndEdits.Text = "You have made " + Edits.ToString() + " edits in " + time.ToString();
            }
        }

        private void okButton_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void linkAWBPage_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            linkAWBPage.LinkVisited = true;
            Tools.OpenENArticleInBrowser("Wikipedia:AutoWikiBrowser", false);
        }

        private void linkBugs_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            linkBugs.LinkVisited = true;
            Tools.OpenENArticleInBrowser("Wikipedia_talk:AutoWikiBrowser/Bugs", false);
        }

        private void linkFeatureRequests_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            linkFeatureRequests.LinkVisited = true;
            Tools.OpenENArticleInBrowser("Wikipedia_talk:AutoWikiBrowser/Feature_requests", false);
        }

        private void UsageStatsLabel_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        { UsageStats.OpenUsageStatsURL(); }
    }
}
