namespace WikiFunctions.Controls
{
    public partial class PageNotContainsControl : PageContainsControl
    {
        public PageNotContainsControl()
        {
            InitializeComponent();
        }

        public override bool Matches(Article article)
        {
            return !base.Matches(article);
        }

        public override string SkipReason
        {
            get { return "Page doesn't contain: " + txtContains.Text; }
        }

        private void chkCaseSensitive_CheckedChanged(object sender, System.EventArgs e)
        {

        }

        private void chkAfterProcessing_CheckedChanged(object sender, System.EventArgs e)
        {

        }
    }
}
