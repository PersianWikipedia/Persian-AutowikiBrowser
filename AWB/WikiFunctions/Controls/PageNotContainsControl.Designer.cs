namespace WikiFunctions.Controls
{
    partial class PageNotContainsControl
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // chkCaseSensitive
            // 
            this.toolTip1.SetToolTip(this.chkCaseSensitive, "Makes \"Doesn\'t contain\" matches case-sensitive");
            this.chkCaseSensitive.CheckedChanged += new System.EventHandler(this.chkCaseSensitive_CheckedChanged);
            // 
            // chkAfterProcessing
            // 
            this.chkAfterProcessing.Location = new System.Drawing.Point(180, 26);
            this.chkAfterProcessing.Size = new System.Drawing.Size(74, 17);
            this.chkAfterProcessing.Text = "بررسی‌بعد";
            this.toolTip1.SetToolTip(this.chkAfterProcessing, "Apply the \"Doesn\'t contain\" check after processing the page");
            this.chkAfterProcessing.CheckedChanged += new System.EventHandler(this.chkAfterProcessing_CheckedChanged);
            // 
            // chkIsRegex
            // 
            this.toolTip1.SetToolTip(this.chkIsRegex, "Enables regular expressions for \"Doesn\'t contain\"");
            // 
            // txtContains
            // 
            this.txtContains.Location = new System.Drawing.Point(1, 3);
            this.txtContains.Size = new System.Drawing.Size(204, 20);
            this.toolTip1.SetToolTip(this.txtContains, "Skip pages that don\'t contain this text");
            // 
            // chkContains
            // 
            this.chkContains.Location = new System.Drawing.Point(149, 5);
            this.chkContains.Size = new System.Drawing.Size(107, 17);
            this.chkContains.Text = "ندارد:";
            this.toolTip1.SetToolTip(this.chkContains, "Skip pages that don\'t contain this text");
            // 
            // PageNotContainsControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Name = "PageNotContainsControl";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
    }
}
