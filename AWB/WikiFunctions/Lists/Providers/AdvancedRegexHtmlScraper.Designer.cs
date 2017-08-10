namespace WikiFunctions.Lists.Providers
{
    partial class AdvancedRegexHtmlScraper
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

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.label1 = new System.Windows.Forms.Label();
            this.RegexTextBox = new System.Windows.Forms.TextBox();
            this.menu = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.cutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.copyToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.pasteToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.copyToRegexTesterToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.label2 = new System.Windows.Forms.Label();
            this.GroupNumber = new System.Windows.Forms.NumericUpDown();
            this.OkBtn = new System.Windows.Forms.Button();
            this.CancelBtn = new System.Windows.Forms.Button();
            this.SingleLineCheckBox = new System.Windows.Forms.CheckBox();
            this.MultiLineCheckBox = new System.Windows.Forms.CheckBox();
            this.CaseSensitiveCheckBox = new System.Windows.Forms.CheckBox();
            this.toolTip1 = new WikiFunctions.Controls.AWBToolTip(this.components);
            this.menu.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.GroupNumber)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 15);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(77, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "عبارت باقاعده:";
            // 
            // RegexTextBox
            // 
            this.RegexTextBox.ContextMenuStrip = this.menu;
            this.RegexTextBox.Location = new System.Drawing.Point(95, 12);
            this.RegexTextBox.Name = "RegexTextBox";
            this.RegexTextBox.Size = new System.Drawing.Size(226, 20);
            this.RegexTextBox.TabIndex = 1;
            this.toolTip1.SetToolTip(this.RegexTextBox, "Regex to match against the HTML of the target website");
            // 
            // menu
            // 
            this.menu.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.cutToolStripMenuItem,
            this.copyToolStripMenuItem,
            this.pasteToolStripMenuItem,
            this.copyToRegexTesterToolStripMenuItem});
            this.menu.Name = "menu";
            this.menu.Size = new System.Drawing.Size(223, 92);
            // 
            // cutToolStripMenuItem
            // 
            this.cutToolStripMenuItem.Name = "cutToolStripMenuItem";
            this.cutToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.C)));
            this.cutToolStripMenuItem.Size = new System.Drawing.Size(222, 22);
            this.cutToolStripMenuItem.Text = "برش";
            this.cutToolStripMenuItem.Click += new System.EventHandler(this.cutToolStripMenuItem_Click);
            // 
            // copyToolStripMenuItem
            // 
            this.copyToolStripMenuItem.Name = "copyToolStripMenuItem";
            this.copyToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.X)));
            this.copyToolStripMenuItem.Size = new System.Drawing.Size(222, 22);
            this.copyToolStripMenuItem.Text = "کپی";
            this.copyToolStripMenuItem.Click += new System.EventHandler(this.copyToolStripMenuItem_Click);
            // 
            // pasteToolStripMenuItem
            // 
            this.pasteToolStripMenuItem.Name = "pasteToolStripMenuItem";
            this.pasteToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.V)));
            this.pasteToolStripMenuItem.Size = new System.Drawing.Size(222, 22);
            this.pasteToolStripMenuItem.Text = "پیست";
            this.pasteToolStripMenuItem.Click += new System.EventHandler(this.pasteToolStripMenuItem_Click);
            // 
            // copyToRegexTesterToolStripMenuItem
            // 
            this.copyToRegexTesterToolStripMenuItem.Name = "copyToRegexTesterToolStripMenuItem";
            this.copyToRegexTesterToolStripMenuItem.Size = new System.Drawing.Size(222, 22);
            this.copyToRegexTesterToolStripMenuItem.Text = "کپی به آزمایشگر عبارت باقاعده";
            this.copyToRegexTesterToolStripMenuItem.Click += new System.EventHandler(this.copyToRegexTesterToolStripMenuItem_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(14, 63);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(34, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "گروه:";
            // 
            // GroupNumber
            // 
            this.GroupNumber.Location = new System.Drawing.Point(59, 61);
            this.GroupNumber.Name = "GroupNumber";
            this.GroupNumber.Size = new System.Drawing.Size(59, 20);
            this.GroupNumber.TabIndex = 3;
            this.toolTip1.SetToolTip(this.GroupNumber, "What match group to add to the article list. Use group 0 for the complete regex m" +
        "atc");
            // 
            // OkBtn
            // 
            this.OkBtn.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.OkBtn.Location = new System.Drawing.Point(139, 89);
            this.OkBtn.Name = "OkBtn";
            this.OkBtn.Size = new System.Drawing.Size(75, 23);
            this.OkBtn.TabIndex = 4;
            this.OkBtn.Text = "تأیید";
            this.OkBtn.UseVisualStyleBackColor = true;
            this.OkBtn.Click += new System.EventHandler(this.OkButton_Click);
            // 
            // CancelBtn
            // 
            this.CancelBtn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.CancelBtn.Location = new System.Drawing.Point(246, 89);
            this.CancelBtn.Name = "CancelBtn";
            this.CancelBtn.Size = new System.Drawing.Size(75, 23);
            this.CancelBtn.TabIndex = 5;
            this.CancelBtn.Text = "لغو";
            this.CancelBtn.UseVisualStyleBackColor = true;
            this.CancelBtn.Click += new System.EventHandler(this.CancelButton_Click);
            // 
            // SingleLineCheckBox
            // 
            this.SingleLineCheckBox.AutoSize = true;
            this.SingleLineCheckBox.Location = new System.Drawing.Point(174, 38);
            this.SingleLineCheckBox.Name = "SingleLineCheckBox";
            this.SingleLineCheckBox.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.SingleLineCheckBox.Size = new System.Drawing.Size(51, 17);
            this.SingleLineCheckBox.TabIndex = 6;
            this.SingleLineCheckBox.Text = "تک‌خط";
            this.toolTip1.SetToolTip(this.SingleLineCheckBox, "Changes meaning of \".\"  so it matches all characters, as opposed to all apart fro" +
        "m newlines");
            this.SingleLineCheckBox.UseVisualStyleBackColor = true;
            // 
            // MultiLineCheckBox
            // 
            this.MultiLineCheckBox.AutoSize = true;
            this.MultiLineCheckBox.Location = new System.Drawing.Point(265, 38);
            this.MultiLineCheckBox.Name = "MultiLineCheckBox";
            this.MultiLineCheckBox.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.MultiLineCheckBox.Size = new System.Drawing.Size(56, 17);
            this.MultiLineCheckBox.TabIndex = 7;
            this.MultiLineCheckBox.Text = "چندخط";
            this.toolTip1.SetToolTip(this.MultiLineCheckBox, "Changes meaning of \"^\" and \"$\" so they represent the beginning and end respective" +
        "ly of every line, rather just of the entire string");
            this.MultiLineCheckBox.UseVisualStyleBackColor = true;
            // 
            // CaseSensitiveCheckBox
            // 
            this.CaseSensitiveCheckBox.AutoSize = true;
            this.CaseSensitiveCheckBox.Location = new System.Drawing.Point(27, 38);
            this.CaseSensitiveCheckBox.Name = "CaseSensitiveCheckBox";
            this.CaseSensitiveCheckBox.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.CaseSensitiveCheckBox.Size = new System.Drawing.Size(106, 17);
            this.CaseSensitiveCheckBox.TabIndex = 8;
            this.CaseSensitiveCheckBox.Text = "بزرگی و کوچکی";
            this.toolTip1.SetToolTip(this.CaseSensitiveCheckBox, "Enables case sensitivity");
            this.CaseSensitiveCheckBox.UseVisualStyleBackColor = true;
            // 
            // AdvancedRegexHtmlScraper
            // 
            this.AcceptButton = this.OkBtn;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(333, 123);
            this.Controls.Add(this.CaseSensitiveCheckBox);
            this.Controls.Add(this.MultiLineCheckBox);
            this.Controls.Add(this.SingleLineCheckBox);
            this.Controls.Add(this.CancelBtn);
            this.Controls.Add(this.OkBtn);
            this.Controls.Add(this.RegexTextBox);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.GroupNumber);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "AdvancedRegexHtmlScraper";
            this.Text = "عبارت باقاعده اچ‌تی‌ام‌ال";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.AdvancedRegexHtmlScraper_FormClosing);
            this.menu.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.GroupNumber)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox RegexTextBox;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.NumericUpDown GroupNumber;
        private System.Windows.Forms.Button OkBtn;
        private System.Windows.Forms.Button CancelBtn;
        private System.Windows.Forms.ContextMenuStrip menu;
        private System.Windows.Forms.ToolStripMenuItem cutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem copyToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem pasteToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem copyToRegexTesterToolStripMenuItem;
        private System.Windows.Forms.CheckBox SingleLineCheckBox;
        private System.Windows.Forms.CheckBox MultiLineCheckBox;
        private System.Windows.Forms.CheckBox CaseSensitiveCheckBox;
        private WikiFunctions.Controls.AWBToolTip toolTip1;
    }
}