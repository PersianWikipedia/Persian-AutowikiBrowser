//$Header: /cvsroot/autowikibrowser/src/Project\040select.Designer.cs,v 1.15 2006/06/15 10:14:49 wikibluemoose Exp $

namespace AutoWikiBrowser
{
    partial class MyPreferences
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
                if (TextBoxFont != null) TextBoxFont.Dispose();

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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MyPreferences));
            this.cmboLang = new System.Windows.Forms.ComboBox();
            this.btnOK = new System.Windows.Forms.Button();
            this.cmboProject = new System.Windows.Forms.ComboBox();
            this.lblLang = new System.Windows.Forms.Label();
            this.lblProject = new System.Windows.Forms.Label();
            this.lblNonEnNotice = new System.Windows.Forms.Label();
            this.btnTextBoxFont = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.lblPostfix = new System.Windows.Forms.Label();
            this.cmboCustomProject = new System.Windows.Forms.ComboBox();
            this.chkAddUsingAWBToActionSummaries = new System.Windows.Forms.CheckBox();
            this.chkAlwaysConfirmExit = new System.Windows.Forms.CheckBox();
            this.chkSupressAWB = new System.Windows.Forms.CheckBox();
            this.chkSaveArticleList = new System.Windows.Forms.CheckBox();
            this.chkMinimize = new System.Windows.Forms.CheckBox();
            this.chkLowPriority = new System.Windows.Forms.CheckBox();
            this.chkBeep = new System.Windows.Forms.CheckBox();
            this.chkFlash = new System.Windows.Forms.CheckBox();
            this.lblDoneDo = new System.Windows.Forms.Label();
            this.chkAutoSaveEdit = new System.Windows.Forms.CheckBox();
            this.fontDialog = new System.Windows.Forms.FontDialog();
            this.AutoSaveEditBoxGroup = new System.Windows.Forms.GroupBox();
            this.btnSetFile = new System.Windows.Forms.Button();
            this.txtAutosave = new System.Windows.Forms.TextBox();
            this.lblAutosaveFile = new System.Windows.Forms.Label();
            this.AutoSaveEditCont = new System.Windows.Forms.Label();
            this.nudEditBoxAutosave = new System.Windows.Forms.NumericUpDown();
            this.saveFile = new System.Windows.Forms.SaveFileDialog();
            this.chkPrivacy = new System.Windows.Forms.CheckBox();
            this.lblPrivacy = new System.Windows.Forms.Label();
            this.tbPrefs = new System.Windows.Forms.TabControl();
            this.tabGeneral = new System.Windows.Forms.TabPage();
            this.chkEnableLogging = new System.Windows.Forms.CheckBox();
            this.chkDiffInBotMode = new System.Windows.Forms.CheckBox();
            this.cmboOnLoad = new System.Windows.Forms.ComboBox();
            this.label4 = new System.Windows.Forms.Label();
            this.tabSite = new System.Windows.Forms.TabPage();
            this.txtDomain = new System.Windows.Forms.TextBox();
            this.chkDomain = new System.Windows.Forms.CheckBox();
            this.cmboProtocol = new System.Windows.Forms.ComboBox();
            this.chkEmptyOnProjectChange = new System.Windows.Forms.CheckBox();
            this.chkIgnoreNoBots = new System.Windows.Forms.CheckBox();
            this.tabEditing = new System.Windows.Forms.TabPage();
            this.chkShowTimer = new System.Windows.Forms.CheckBox();
            this.tabTools = new System.Windows.Forms.TabPage();
            this.cmboDBScanner = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.cmboListSplitter = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.cmboListComparer = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.tabPrivacy = new System.Windows.Forms.TabPage();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.alertListBox = new System.Windows.Forms.CheckedListBox();
            this.ToolTip = new WikiFunctions.Controls.AWBToolTip(this.components);
            this.lblSaveAsDefaultFile = new System.Windows.Forms.Label();
            this.AutoSaveEditBoxGroup.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.nudEditBoxAutosave)).BeginInit();
            this.tbPrefs.SuspendLayout();
            this.tabGeneral.SuspendLayout();
            this.tabSite.SuspendLayout();
            this.tabEditing.SuspendLayout();
            this.tabTools.SuspendLayout();
            this.tabPrivacy.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.SuspendLayout();
            // 
            // cmboLang
            // 
            this.cmboLang.DropDownHeight = 212;
            this.cmboLang.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmboLang.FormattingEnabled = true;
            this.cmboLang.IntegralHeight = false;
            this.cmboLang.Location = new System.Drawing.Point(70, 33);
            this.cmboLang.Name = "cmboLang";
            this.cmboLang.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.cmboLang.Size = new System.Drawing.Size(121, 21);
            this.cmboLang.TabIndex = 3;
            // 
            // btnOK
            // 
            this.btnOK.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnOK.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnOK.Location = new System.Drawing.Point(246, 228);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(75, 23);
            this.btnOK.TabIndex = 2;
            this.btnOK.Text = "تأیید";
            this.btnOK.Click += new System.EventHandler(this.btnOk_Click);
            // 
            // cmboProject
            // 
            this.cmboProject.DropDownHeight = 206;
            this.cmboProject.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmboProject.FormattingEnabled = true;
            this.cmboProject.IntegralHeight = false;
            this.cmboProject.Location = new System.Drawing.Point(70, 6);
            this.cmboProject.Name = "cmboProject";
            this.cmboProject.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.cmboProject.Size = new System.Drawing.Size(121, 21);
            this.cmboProject.TabIndex = 1;
            this.cmboProject.SelectedIndexChanged += new System.EventHandler(this.cmboProject_SelectedIndexChanged);
            // 
            // lblLang
            // 
            this.lblLang.Location = new System.Drawing.Point(6, 36);
            this.lblLang.Name = "lblLang";
            this.lblLang.Size = new System.Drawing.Size(58, 13);
            this.lblLang.TabIndex = 2;
            this.lblLang.Text = "&Language:";
            this.lblLang.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // lblProject
            // 
            this.lblProject.AutoSize = true;
            this.lblProject.Location = new System.Drawing.Point(197, 9);
            this.lblProject.Name = "lblProject";
            this.lblProject.Size = new System.Drawing.Size(36, 13);
            this.lblProject.TabIndex = 0;
            this.lblProject.Text = "پروژه:";
            // 
            // lblNonEnNotice
            // 
            this.lblNonEnNotice.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblNonEnNotice.Location = new System.Drawing.Point(-4, 80);
            this.lblNonEnNotice.Name = "lblNonEnNotice";
            this.lblNonEnNotice.Size = new System.Drawing.Size(370, 19);
            this.lblNonEnNotice.TabIndex = 6;
            this.lblNonEnNotice.Text = "برای ویکی‌های غیرمرتبط با ویکی‌مدیا ممکن است خطا وجود داشته باشد";
            // 
            // btnTextBoxFont
            // 
            this.btnTextBoxFont.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnTextBoxFont.Location = new System.Drawing.Point(267, 152);
            this.btnTextBoxFont.Name = "btnTextBoxFont";
            this.btnTextBoxFont.Size = new System.Drawing.Size(112, 23);
            this.btnTextBoxFont.TabIndex = 5;
            this.btnTextBoxFont.Text = "تنظیمات قلم جعبه ویرایش";
            this.btnTextBoxFont.UseVisualStyleBackColor = true;
            this.btnTextBoxFont.Click += new System.EventHandler(this.btnTextBoxFont_Click);
            // 
            // btnCancel
            // 
            this.btnCancel.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.btnCancel.Location = new System.Drawing.Point(327, 228);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(75, 23);
            this.btnCancel.TabIndex = 3;
            this.btnCancel.Text = "لغو";
            // 
            // lblPostfix
            // 
            this.lblPostfix.AutoSize = true;
            this.lblPostfix.Location = new System.Drawing.Point(197, 36);
            this.lblPostfix.Name = "lblPostfix";
            this.lblPostfix.Size = new System.Drawing.Size(48, 13);
            this.lblPostfix.TabIndex = 4;
            this.lblPostfix.Text = "lblPostfix";
            // 
            // cmboCustomProject
            // 
            this.cmboCustomProject.FormattingEnabled = true;
            this.cmboCustomProject.Location = new System.Drawing.Point(70, 33);
            this.cmboCustomProject.Name = "cmboCustomProject";
            this.cmboCustomProject.Size = new System.Drawing.Size(121, 21);
            this.cmboCustomProject.TabIndex = 5;
            this.cmboCustomProject.SelectedIndexChanged += new System.EventHandler(this.cmboCustomProjectChanged);
            this.cmboCustomProject.TextChanged += new System.EventHandler(this.cmboCustomProjectChanged);
            this.cmboCustomProject.Leave += new System.EventHandler(this.txtCustomProject_Leave);
            // 
            // chkAddUsingAWBToActionSummaries
            // 
            this.chkAddUsingAWBToActionSummaries.AutoSize = true;
            this.chkAddUsingAWBToActionSummaries.Location = new System.Drawing.Point(26, 105);
            this.chkAddUsingAWBToActionSummaries.Name = "chkAddUsingAWBToActionSummaries";
            this.chkAddUsingAWBToActionSummaries.Size = new System.Drawing.Size(330, 17);
            this.chkAddUsingAWBToActionSummaries.TabIndex = 1;
            this.chkAddUsingAWBToActionSummaries.Text = "افزودن ویرایشگر خودکار به خلاصه ویرایش در زمان محافظت یا حذف";
            this.chkAddUsingAWBToActionSummaries.UseVisualStyleBackColor = true;
            // 
            // chkAlwaysConfirmExit
            // 
            this.chkAlwaysConfirmExit.AutoSize = true;
            this.chkAlwaysConfirmExit.Checked = true;
            this.chkAlwaysConfirmExit.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkAlwaysConfirmExit.Location = new System.Drawing.Point(277, 29);
            this.chkAlwaysConfirmExit.Name = "chkAlwaysConfirmExit";
            this.chkAlwaysConfirmExit.Size = new System.Drawing.Size(84, 17);
            this.chkAlwaysConfirmExit.TabIndex = 2;
            this.chkAlwaysConfirmExit.Text = "هشدار خروج";
            this.chkAlwaysConfirmExit.UseVisualStyleBackColor = true;
            // 
            // chkSupressAWB
            // 
            this.chkSupressAWB.AutoSize = true;
            this.chkSupressAWB.Enabled = false;
            this.chkSupressAWB.Location = new System.Drawing.Point(64, 60);
            this.chkSupressAWB.Name = "chkSupressAWB";
            this.chkSupressAWB.Size = new System.Drawing.Size(299, 17);
            this.chkSupressAWB.TabIndex = 5;
            this.chkSupressAWB.Text = "افزودن پسوند استفاده از ویرایشگر خودکار به خلاصه ویرایش";
            this.chkSupressAWB.UseVisualStyleBackColor = true;
            // 
            // chkSaveArticleList
            // 
            this.chkSaveArticleList.AutoSize = true;
            this.chkSaveArticleList.Checked = true;
            this.chkSaveArticleList.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkSaveArticleList.Location = new System.Drawing.Point(192, 52);
            this.chkSaveArticleList.Name = "chkSaveArticleList";
            this.chkSaveArticleList.Size = new System.Drawing.Size(169, 17);
            this.chkSaveArticleList.TabIndex = 3;
            this.chkSaveArticleList.Text = "ذخیره فهرست صفحه با تنظیمات";
            this.ToolTip.SetToolTip(this.chkSaveArticleList, "Allows you to save the current page list every time the settings are saved");
            this.chkSaveArticleList.UseVisualStyleBackColor = true;
            // 
            // chkMinimize
            // 
            this.chkMinimize.AutoSize = true;
            this.chkMinimize.Location = new System.Drawing.Point(199, 6);
            this.chkMinimize.Name = "chkMinimize";
            this.chkMinimize.Size = new System.Drawing.Size(162, 17);
            this.chkMinimize.TabIndex = 1;
            this.chkMinimize.Text = "کوچک‌شدن در بخش آگاه‌سازی";
            this.chkMinimize.UseVisualStyleBackColor = true;
            // 
            // chkLowPriority
            // 
            this.chkLowPriority.AutoSize = true;
            this.chkLowPriority.Location = new System.Drawing.Point(146, 75);
            this.chkLowPriority.Name = "chkLowPriority";
            this.chkLowPriority.Size = new System.Drawing.Size(215, 17);
            this.chkLowPriority.TabIndex = 4;
            this.chkLowPriority.Text = "اولویت پایین (در پس‌زمینه بهتر کار می‌کند)";
            this.ToolTip.SetToolTip(this.chkLowPriority, "Sets CPU thread priority to low");
            this.chkLowPriority.UseVisualStyleBackColor = true;
            // 
            // chkBeep
            // 
            this.chkBeep.AutoSize = true;
            this.chkBeep.Checked = true;
            this.chkBeep.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkBeep.Location = new System.Drawing.Point(139, 129);
            this.chkBeep.Name = "chkBeep";
            this.chkBeep.Size = new System.Drawing.Size(44, 17);
            this.chkBeep.TabIndex = 4;
            this.chkBeep.Text = "بوق";
            this.chkBeep.UseVisualStyleBackColor = true;
            // 
            // chkFlash
            // 
            this.chkFlash.AutoSize = true;
            this.chkFlash.Checked = true;
            this.chkFlash.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkFlash.Location = new System.Drawing.Point(77, 129);
            this.chkFlash.Name = "chkFlash";
            this.chkFlash.Size = new System.Drawing.Size(44, 17);
            this.chkFlash.TabIndex = 3;
            this.chkFlash.Text = "فلش";
            this.chkFlash.UseVisualStyleBackColor = true;
            // 
            // lblDoneDo
            // 
            this.lblDoneDo.AutoSize = true;
            this.lblDoneDo.Location = new System.Drawing.Point(202, 133);
            this.lblDoneDo.Name = "lblDoneDo";
            this.lblDoneDo.Size = new System.Drawing.Size(149, 13);
            this.lblDoneDo.TabIndex = 2;
            this.lblDoneDo.Text = "زمانی که برای ذخیره آماده شد";
            // 
            // chkAutoSaveEdit
            // 
            this.chkAutoSaveEdit.AutoSize = true;
            this.chkAutoSaveEdit.Location = new System.Drawing.Point(172, 19);
            this.chkAutoSaveEdit.Name = "chkAutoSaveEdit";
            this.chkAutoSaveEdit.Size = new System.Drawing.Size(178, 17);
            this.chkAutoSaveEdit.TabIndex = 0;
            this.chkAutoSaveEdit.Text = "ذخیره خودکار جعبه ویرایش هر از ";
            this.chkAutoSaveEdit.UseVisualStyleBackColor = true;
            this.chkAutoSaveEdit.CheckedChanged += new System.EventHandler(this.chkAutoSaveEdit_CheckedChanged);
            // 
            // AutoSaveEditBoxGroup
            // 
            this.AutoSaveEditBoxGroup.Controls.Add(this.btnSetFile);
            this.AutoSaveEditBoxGroup.Controls.Add(this.txtAutosave);
            this.AutoSaveEditBoxGroup.Controls.Add(this.lblAutosaveFile);
            this.AutoSaveEditBoxGroup.Controls.Add(this.AutoSaveEditCont);
            this.AutoSaveEditBoxGroup.Controls.Add(this.nudEditBoxAutosave);
            this.AutoSaveEditBoxGroup.Controls.Add(this.chkAutoSaveEdit);
            this.AutoSaveEditBoxGroup.Location = new System.Drawing.Point(6, 6);
            this.AutoSaveEditBoxGroup.Name = "AutoSaveEditBoxGroup";
            this.AutoSaveEditBoxGroup.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.AutoSaveEditBoxGroup.Size = new System.Drawing.Size(370, 70);
            this.AutoSaveEditBoxGroup.TabIndex = 0;
            this.AutoSaveEditBoxGroup.TabStop = false;
            this.AutoSaveEditBoxGroup.Text = "ذخیره خودکار جعبه ویرایش";
            // 
            // btnSetFile
            // 
            this.btnSetFile.Enabled = false;
            this.btnSetFile.Location = new System.Drawing.Point(289, 40);
            this.btnSetFile.Name = "btnSetFile";
            this.btnSetFile.Size = new System.Drawing.Size(75, 23);
            this.btnSetFile.TabIndex = 5;
            this.btnSetFile.Text = "بازکردن";
            this.btnSetFile.UseVisualStyleBackColor = true;
            this.btnSetFile.Click += new System.EventHandler(this.btnSetFile_Click);
            // 
            // txtAutosave
            // 
            this.txtAutosave.Location = new System.Drawing.Point(38, 42);
            this.txtAutosave.Name = "txtAutosave";
            this.txtAutosave.ReadOnly = true;
            this.txtAutosave.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.txtAutosave.Size = new System.Drawing.Size(245, 20);
            this.txtAutosave.TabIndex = 4;
            // 
            // lblAutosaveFile
            // 
            this.lblAutosaveFile.AutoSize = true;
            this.lblAutosaveFile.Location = new System.Drawing.Point(6, 45);
            this.lblAutosaveFile.Name = "lblAutosaveFile";
            this.lblAutosaveFile.Size = new System.Drawing.Size(40, 13);
            this.lblAutosaveFile.TabIndex = 3;
            this.lblAutosaveFile.Text = "پرونده:";
            // 
            // AutoSaveEditCont
            // 
            this.AutoSaveEditCont.AutoSize = true;
            this.AutoSaveEditCont.Location = new System.Drawing.Point(71, 21);
            this.AutoSaveEditCont.Name = "AutoSaveEditCont";
            this.AutoSaveEditCont.Size = new System.Drawing.Size(28, 13);
            this.AutoSaveEditCont.TabIndex = 2;
            this.AutoSaveEditCont.Text = "ثانیه";
            // 
            // nudEditBoxAutosave
            // 
            this.nudEditBoxAutosave.Location = new System.Drawing.Point(108, 18);
            this.nudEditBoxAutosave.Maximum = new decimal(new int[] {
            300,
            0,
            0,
            0});
            this.nudEditBoxAutosave.Minimum = new decimal(new int[] {
            30,
            0,
            0,
            0});
            this.nudEditBoxAutosave.Name = "nudEditBoxAutosave";
            this.nudEditBoxAutosave.Size = new System.Drawing.Size(58, 20);
            this.nudEditBoxAutosave.TabIndex = 1;
            this.nudEditBoxAutosave.Value = new decimal(new int[] {
            30,
            0,
            0,
            0});
            // 
            // saveFile
            // 
            this.saveFile.Filter = ".txt Files|*.txt";
            // 
            // chkPrivacy
            // 
            this.chkPrivacy.AutoSize = true;
            this.chkPrivacy.Checked = true;
            this.chkPrivacy.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkPrivacy.Location = new System.Drawing.Point(181, 6);
            this.chkPrivacy.Name = "chkPrivacy";
            this.chkPrivacy.Size = new System.Drawing.Size(192, 17);
            this.chkPrivacy.TabIndex = 0;
            this.chkPrivacy.Text = "افزودن نام کاربری برای افزایش دقت";
            // 
            // lblPrivacy
            // 
            this.lblPrivacy.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblPrivacy.Location = new System.Drawing.Point(3, 26);
            this.lblPrivacy.Name = "lblPrivacy";
            this.lblPrivacy.Size = new System.Drawing.Size(370, 129);
            this.lblPrivacy.TabIndex = 1;
            this.lblPrivacy.Text = resources.GetString("lblPrivacy.Text");
            // 
            // tbPrefs
            // 
            this.tbPrefs.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tbPrefs.Controls.Add(this.tabGeneral);
            this.tbPrefs.Controls.Add(this.tabSite);
            this.tbPrefs.Controls.Add(this.tabEditing);
            this.tbPrefs.Controls.Add(this.tabTools);
            this.tbPrefs.Controls.Add(this.tabPrivacy);
            this.tbPrefs.Controls.Add(this.tabPage1);
            this.tbPrefs.Location = new System.Drawing.Point(12, 12);
            this.tbPrefs.Name = "tbPrefs";
            this.tbPrefs.RightToLeftLayout = true;
            this.tbPrefs.SelectedIndex = 0;
            this.tbPrefs.Size = new System.Drawing.Size(390, 207);
            this.tbPrefs.TabIndex = 0;
            // 
            // tabGeneral
            // 
            this.tabGeneral.Controls.Add(this.chkEnableLogging);
            this.tabGeneral.Controls.Add(this.chkDiffInBotMode);
            this.tabGeneral.Controls.Add(this.cmboOnLoad);
            this.tabGeneral.Controls.Add(this.label4);
            this.tabGeneral.Controls.Add(this.chkMinimize);
            this.tabGeneral.Controls.Add(this.chkLowPriority);
            this.tabGeneral.Controls.Add(this.chkSaveArticleList);
            this.tabGeneral.Controls.Add(this.chkAlwaysConfirmExit);
            this.tabGeneral.Location = new System.Drawing.Point(4, 22);
            this.tabGeneral.Name = "tabGeneral";
            this.tabGeneral.Padding = new System.Windows.Forms.Padding(3);
            this.tabGeneral.Size = new System.Drawing.Size(382, 181);
            this.tabGeneral.TabIndex = 4;
            this.tabGeneral.Text = "عمومی";
            this.tabGeneral.UseVisualStyleBackColor = true;
            // 
            // chkEnableLogging
            // 
            this.chkEnableLogging.AutoSize = true;
            this.chkEnableLogging.Checked = true;
            this.chkEnableLogging.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkEnableLogging.Location = new System.Drawing.Point(218, 148);
            this.chkEnableLogging.Name = "chkEnableLogging";
            this.chkEnableLogging.Size = new System.Drawing.Size(142, 17);
            this.chkEnableLogging.TabIndex = 8;
            this.chkEnableLogging.Text = "فعال‌بودن ورود به سامانه";
            this.ToolTip.SetToolTip(this.chkEnableLogging, "Disactivate it to stop logging of saved/skipped pages in the Log tab");
            this.chkEnableLogging.UseVisualStyleBackColor = true;
            // 
            // chkDiffInBotMode
            // 
            this.chkDiffInBotMode.AutoSize = true;
            this.chkDiffInBotMode.Location = new System.Drawing.Point(182, 125);
            this.chkDiffInBotMode.Name = "chkDiffInBotMode";
            this.chkDiffInBotMode.Size = new System.Drawing.Size(178, 17);
            this.chkDiffInBotMode.TabIndex = 7;
            this.chkDiffInBotMode.Text = "نمایش تفاوت ویرایش در حالت ربات";
            this.chkDiffInBotMode.UseVisualStyleBackColor = true;
            // 
            // cmboOnLoad
            // 
            this.cmboOnLoad.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmboOnLoad.FormattingEnabled = true;
            this.cmboOnLoad.Items.AddRange(new object[] {
            "Show changes",
            "Show preview"});
            this.cmboOnLoad.Location = new System.Drawing.Point(146, 98);
            this.cmboOnLoad.Name = "cmboOnLoad";
            this.cmboOnLoad.Size = new System.Drawing.Size(121, 21);
            this.cmboOnLoad.TabIndex = 6;
            this.cmboOnLoad.SelectedIndexChanged += new System.EventHandler(this.cmboOnLoad_SelectedIndexChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(284, 101);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(80, 13);
            this.label4.TabIndex = 5;
            this.label4.Text = "فشار بر سیستم:";
            // 
            // tabSite
            // 
            this.tabSite.Controls.Add(this.txtDomain);
            this.tabSite.Controls.Add(this.chkDomain);
            this.tabSite.Controls.Add(this.cmboProtocol);
            this.tabSite.Controls.Add(this.chkEmptyOnProjectChange);
            this.tabSite.Controls.Add(this.chkSupressAWB);
            this.tabSite.Controls.Add(this.chkIgnoreNoBots);
            this.tabSite.Controls.Add(this.lblPostfix);
            this.tabSite.Controls.Add(this.cmboLang);
            this.tabSite.Controls.Add(this.lblLang);
            this.tabSite.Controls.Add(this.cmboProject);
            this.tabSite.Controls.Add(this.lblProject);
            this.tabSite.Controls.Add(this.cmboCustomProject);
            this.tabSite.Controls.Add(this.lblNonEnNotice);
            this.tabSite.Location = new System.Drawing.Point(4, 22);
            this.tabSite.Name = "tabSite";
            this.tabSite.Padding = new System.Windows.Forms.Padding(3);
            this.tabSite.Size = new System.Drawing.Size(382, 181);
            this.tabSite.TabIndex = 0;
            this.tabSite.Text = "سایت";
            this.tabSite.UseVisualStyleBackColor = true;
            // 
            // txtDomain
            // 
            this.txtDomain.Enabled = false;
            this.txtDomain.Location = new System.Drawing.Point(21, 148);
            this.txtDomain.Name = "txtDomain";
            this.txtDomain.Size = new System.Drawing.Size(165, 20);
            this.txtDomain.TabIndex = 15;
            // 
            // chkDomain
            // 
            this.chkDomain.AutoSize = true;
            this.chkDomain.Enabled = false;
            this.chkDomain.Location = new System.Drawing.Point(241, 148);
            this.chkDomain.Name = "chkDomain";
            this.chkDomain.Size = new System.Drawing.Size(121, 17);
            this.chkDomain.TabIndex = 14;
            this.chkDomain.Text = "نیازمند ورود به دامین";
            this.chkDomain.UseVisualStyleBackColor = true;
            this.chkDomain.Visible = false;
            this.chkDomain.CheckedChanged += new System.EventHandler(this.chkDomain_CheckedChanged);
            // 
            // cmboProtocol
            // 
            this.cmboProtocol.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmboProtocol.FormattingEnabled = true;
            this.cmboProtocol.Items.AddRange(new object[] {
            "http://",
            "https://"});
            this.cmboProtocol.Location = new System.Drawing.Point(6, 33);
            this.cmboProtocol.Name = "cmboProtocol";
            this.cmboProtocol.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.cmboProtocol.Size = new System.Drawing.Size(60, 21);
            this.cmboProtocol.TabIndex = 13;
            this.cmboProtocol.Visible = false;
            // 
            // chkEmptyOnProjectChange
            // 
            this.chkEmptyOnProjectChange.AutoSize = true;
            this.chkEmptyOnProjectChange.Location = new System.Drawing.Point(140, 125);
            this.chkEmptyOnProjectChange.Name = "chkEmptyOnProjectChange";
            this.chkEmptyOnProjectChange.Size = new System.Drawing.Size(222, 17);
            this.chkEmptyOnProjectChange.TabIndex = 12;
            this.chkEmptyOnProjectChange.Text = "در صورت تغییر در پروژه فهرست خالی شود";
            this.ToolTip.SetToolTip(this.chkEmptyOnProjectChange, "Automatically empties the page list on project change");
            this.chkEmptyOnProjectChange.UseVisualStyleBackColor = true;
            // 
            // chkIgnoreNoBots
            // 
            this.chkIgnoreNoBots.AutoSize = true;
            this.chkIgnoreNoBots.Location = new System.Drawing.Point(197, 102);
            this.chkIgnoreNoBots.Name = "chkIgnoreNoBots";
            this.chkIgnoreNoBots.Size = new System.Drawing.Size(165, 17);
            this.chkIgnoreNoBots.TabIndex = 10;
            this.chkIgnoreNoBots.Text = "رهاکردن {{bots}} و {{nobots}}";
            this.ToolTip.SetToolTip(this.chkIgnoreNoBots, "Checking this box will cause you to edit pages with the {{bots}} and {{nobots}} t" +
        "ags on them. By default these pages are skipped.");
            this.chkIgnoreNoBots.UseVisualStyleBackColor = true;
            // 
            // tabEditing
            // 
            this.tabEditing.Controls.Add(this.AutoSaveEditBoxGroup);
            this.tabEditing.Controls.Add(this.chkShowTimer);
            this.tabEditing.Controls.Add(this.chkAddUsingAWBToActionSummaries);
            this.tabEditing.Controls.Add(this.lblDoneDo);
            this.tabEditing.Controls.Add(this.chkFlash);
            this.tabEditing.Controls.Add(this.chkBeep);
            this.tabEditing.Controls.Add(this.btnTextBoxFont);
            this.tabEditing.Location = new System.Drawing.Point(4, 22);
            this.tabEditing.Name = "tabEditing";
            this.tabEditing.Padding = new System.Windows.Forms.Padding(3);
            this.tabEditing.Size = new System.Drawing.Size(382, 181);
            this.tabEditing.TabIndex = 3;
            this.tabEditing.Text = "ویرایش و ذخیره";
            this.tabEditing.UseVisualStyleBackColor = true;
            // 
            // chkShowTimer
            // 
            this.chkShowTimer.AutoSize = true;
            this.chkShowTimer.Location = new System.Drawing.Point(202, 82);
            this.chkShowTimer.Name = "chkShowTimer";
            this.chkShowTimer.Size = new System.Drawing.Size(154, 17);
            this.chkShowTimer.TabIndex = 0;
            this.chkShowTimer.Text = "نمایش تغییرات میانگین زمان ";
            this.chkShowTimer.UseVisualStyleBackColor = true;
            // 
            // tabTools
            // 
            this.tabTools.Controls.Add(this.cmboDBScanner);
            this.tabTools.Controls.Add(this.label3);
            this.tabTools.Controls.Add(this.cmboListSplitter);
            this.tabTools.Controls.Add(this.label2);
            this.tabTools.Controls.Add(this.cmboListComparer);
            this.tabTools.Controls.Add(this.label1);
            this.tabTools.Location = new System.Drawing.Point(4, 22);
            this.tabTools.Name = "tabTools";
            this.tabTools.Padding = new System.Windows.Forms.Padding(3);
            this.tabTools.Size = new System.Drawing.Size(382, 181);
            this.tabTools.TabIndex = 5;
            this.tabTools.Text = "ابزارها";
            this.tabTools.UseVisualStyleBackColor = true;
            // 
            // cmboDBScanner
            // 
            this.cmboDBScanner.FormattingEnabled = true;
            this.cmboDBScanner.Items.AddRange(new object[] {
            "Ask",
            "Always",
            "Never"});
            this.cmboDBScanner.Location = new System.Drawing.Point(6, 71);
            this.cmboDBScanner.Name = "cmboDBScanner";
            this.cmboDBScanner.Size = new System.Drawing.Size(121, 21);
            this.cmboDBScanner.TabIndex = 5;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(137, 73);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(239, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "افزودن جستجوگر پایگاه داده به نتسجه این فهرست";
            // 
            // cmboListSplitter
            // 
            this.cmboListSplitter.FormattingEnabled = true;
            this.cmboListSplitter.Items.AddRange(new object[] {
            "Ask",
            "Always",
            "Never"});
            this.cmboListSplitter.Location = new System.Drawing.Point(6, 44);
            this.cmboListSplitter.Name = "cmboListSplitter";
            this.cmboListSplitter.Size = new System.Drawing.Size(121, 21);
            this.cmboListSplitter.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(185, 47);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(192, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "افزودن مقالات کنونی به فهرست جداساز:";
            // 
            // cmboListComparer
            // 
            this.cmboListComparer.FormattingEnabled = true;
            this.cmboListComparer.Items.AddRange(new object[] {
            "Ask",
            "Always",
            "Never"});
            this.cmboListComparer.Location = new System.Drawing.Point(6, 14);
            this.cmboListComparer.Name = "cmboListComparer";
            this.cmboListComparer.Size = new System.Drawing.Size(121, 21);
            this.cmboListComparer.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(185, 19);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(191, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "افزودن مقالات کنونی به فهرست مقایسه:";
            // 
            // tabPrivacy
            // 
            this.tabPrivacy.Controls.Add(this.lblPrivacy);
            this.tabPrivacy.Controls.Add(this.chkPrivacy);
            this.tabPrivacy.Location = new System.Drawing.Point(4, 22);
            this.tabPrivacy.Name = "tabPrivacy";
            this.tabPrivacy.Padding = new System.Windows.Forms.Padding(3);
            this.tabPrivacy.Size = new System.Drawing.Size(382, 181);
            this.tabPrivacy.TabIndex = 1;
            this.tabPrivacy.Text = "حریم‌خصوصی";
            this.tabPrivacy.UseVisualStyleBackColor = true;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.alertListBox);
            this.tabPage1.Location = new System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(382, 181);
            this.tabPage1.TabIndex = 6;
            this.tabPage1.Text = "هشدارها";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // alertListBox
            // 
            this.alertListBox.FormattingEnabled = true;
            this.alertListBox.Location = new System.Drawing.Point(6, 6);
            this.alertListBox.Name = "alertListBox";
            this.alertListBox.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.alertListBox.Size = new System.Drawing.Size(370, 169);
            this.alertListBox.TabIndex = 0;
            // 
            // lblSaveAsDefaultFile
            // 
            this.lblSaveAsDefaultFile.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.lblSaveAsDefaultFile.AutoSize = true;
            this.lblSaveAsDefaultFile.Location = new System.Drawing.Point(13, 233);
            this.lblSaveAsDefaultFile.Name = "lblSaveAsDefaultFile";
            this.lblSaveAsDefaultFile.Size = new System.Drawing.Size(225, 13);
            this.lblSaveAsDefaultFile.TabIndex = 1;
            this.lblSaveAsDefaultFile.Text = "تنظیمات را ذخیره کنید تا دفعات بعد هم بازگردند";
            // 
            // MyPreferences
            // 
            this.AcceptButton = this.btnOK;
            this.CancelButton = this.btnCancel;
            this.ClientSize = new System.Drawing.Size(414, 263);
            this.Controls.Add(this.tbPrefs);
            this.Controls.Add(this.btnCancel);
            this.Controls.Add(this.btnOK);
            this.Controls.Add(this.lblSaveAsDefaultFile);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "MyPreferences";
            this.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.RightToLeftLayout = true;
            this.ShowIcon = false;
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "ترجیحات";
            this.AutoSaveEditBoxGroup.ResumeLayout(false);
            this.AutoSaveEditBoxGroup.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.nudEditBoxAutosave)).EndInit();
            this.tbPrefs.ResumeLayout(false);
            this.tabGeneral.ResumeLayout(false);
            this.tabGeneral.PerformLayout();
            this.tabSite.ResumeLayout(false);
            this.tabSite.PerformLayout();
            this.tabEditing.ResumeLayout(false);
            this.tabEditing.PerformLayout();
            this.tabTools.ResumeLayout(false);
            this.tabTools.PerformLayout();
            this.tabPrivacy.ResumeLayout(false);
            this.tabPrivacy.PerformLayout();
            this.tabPage1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox cmboLang;
        private System.Windows.Forms.Button btnOK;
        private System.Windows.Forms.ComboBox cmboProject;
        private System.Windows.Forms.Label lblLang;
        private System.Windows.Forms.Label lblProject;
        private System.Windows.Forms.Label lblNonEnNotice;
        private System.Windows.Forms.Button btnTextBoxFont;
        private System.Windows.Forms.Button btnCancel;
        private System.Windows.Forms.FontDialog fontDialog;
        private System.Windows.Forms.CheckBox chkLowPriority;
        private System.Windows.Forms.CheckBox chkBeep;
        private System.Windows.Forms.CheckBox chkFlash;
        private System.Windows.Forms.CheckBox chkMinimize;
        private System.Windows.Forms.CheckBox chkSaveArticleList;
        private System.Windows.Forms.Label lblDoneDo;
        private System.Windows.Forms.CheckBox chkAutoSaveEdit;
        private System.Windows.Forms.GroupBox AutoSaveEditBoxGroup;
        private System.Windows.Forms.Label AutoSaveEditCont;
        private System.Windows.Forms.NumericUpDown nudEditBoxAutosave;
        private System.Windows.Forms.TextBox txtAutosave;
        private System.Windows.Forms.Label lblAutosaveFile;
        private System.Windows.Forms.ComboBox cmboCustomProject;
        private System.Windows.Forms.Button btnSetFile;
        private System.Windows.Forms.SaveFileDialog saveFile;
        private System.Windows.Forms.Label lblPostfix;
        private System.Windows.Forms.CheckBox chkSupressAWB;
        private System.Windows.Forms.CheckBox chkAlwaysConfirmExit;
        private System.Windows.Forms.Label lblPrivacy;
        private System.Windows.Forms.CheckBox chkPrivacy;
        private System.Windows.Forms.CheckBox chkAddUsingAWBToActionSummaries;
        private System.Windows.Forms.TabControl tbPrefs;
        private System.Windows.Forms.TabPage tabSite;
        private System.Windows.Forms.TabPage tabPrivacy;
        private System.Windows.Forms.TabPage tabGeneral;
        private System.Windows.Forms.TabPage tabEditing;
        private System.Windows.Forms.CheckBox chkIgnoreNoBots;
        private System.Windows.Forms.CheckBox chkShowTimer;
        private System.Windows.Forms.Label lblSaveAsDefaultFile;
        private WikiFunctions.Controls.AWBToolTip ToolTip;
        private System.Windows.Forms.TabPage tabTools;
        private System.Windows.Forms.ComboBox cmboListComparer;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox cmboListSplitter;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox cmboDBScanner;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox cmboOnLoad;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.CheckBox chkDiffInBotMode;
        private System.Windows.Forms.CheckBox chkEmptyOnProjectChange;
        private System.Windows.Forms.CheckBox chkEnableLogging;
        private System.Windows.Forms.ComboBox cmboProtocol;
        private System.Windows.Forms.CheckBox chkDomain;
        private System.Windows.Forms.TextBox txtDomain;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.CheckedListBox alertListBox;
    }
}