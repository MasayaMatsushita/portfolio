interface ExternalSiteCardProps {
  siteName: string;
  siteLink: string;
  siteIcon: any;
  siteIconDescription?: string;
}

const ExternalSiteCard = (props: ExternalSiteCardProps) => {
  return (
    <a  href={props.siteLink} target="_blank" rel="noopener noreferrer">
      <div style={{width:"50px"}}>
        {props.siteIcon}
      </div>
    </a>
  )
};

export default ExternalSiteCard;