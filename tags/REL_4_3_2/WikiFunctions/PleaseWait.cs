/*

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
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Threading;

namespace WikiFunctions.Background
{
    public partial class PleaseWait : Form
    {
        delegate void SetTextCallback(string text);

        delegate void SetProgressCallback(int Completed, int Total);

        public Thread Worker;

        public PleaseWait()
        {
            InitializeComponent();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Worker.Abort();
            Close();
        }

        private void SetStatus(string status)
        {
            if (lblStatus.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetStatus);
                Invoke(d, new object[] { status });
            }
            else
                lblStatus.Text = status;
        }

        public string Status
        {
            get { return lblStatus.Text; }
            set { SetStatus(value); }
        }

        public void SetProgress(int Completed, int Total)
        {
            if (Progress.InvokeRequired)
            {
                SetProgressCallback d = new SetProgressCallback(SetProgress);
                Invoke(d, new object[] { Completed, Total });
            }
            else
            {
                Progress.Maximum = Total;
                Progress.Value = Completed;

                groupBox.Text = string.Format("{0}/{1} complete", Completed, Total);
            }
        }
    }
}