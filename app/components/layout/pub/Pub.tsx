import Icon from "~/components/icon";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import "./styles.css";
import { useRef } from "react";
import { Link, useOutletContext } from "react-router";
import banner_pub from "../../../assets/images/banner_pub.png";

const Pub = () => {
  const ref = useRef<HTMLElement>(null);
  const data = useOutletContext() as any;
  const pubData = data?.pubData?.results[0]?.data;
  const socialMediaLinks = data?.socialMediaLinks?.results[0]?.data;

  return (
    <section ref={ref}>
      <div className="flex flex-col gap-9 mt-8 lg:flex-row">
        <div
          className="bg-pub-img justify-center items-center flex h-[300px] rounded-[20px] lg:flex-1 xl:justify-start xl:pl-16"
          style={{
            backgroundImage: `url(${pubData?.pub_img_1?.url ? pubData?.pub_img_1?.url : banner_pub})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col gap-8 ">
            <div className="flex gap-8 items-center">
              <Icon name="LogoBease" />
            </div>
            <Link
              to={pubData?.link_1?.url ? pubData?.link_1?.url : "#"}
              target="_blank"
            >
              <AppButton>Voir les produits</AppButton>
            </Link>
          </div>
        </div>

        <div
          className="bg-pub-img justify-center items-center flex h-[300px] rounded-[20px] lg:flex-1 xl:justify-start xl:pl-16"
          style={{
            backgroundImage: `url(${pubData?.pub_img_2?.url ? pubData?.pub_img_2?.url : banner_pub})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col gap-8 ">
            <Icon name="LogoBease" />
            <Link
              to={pubData?.link_2?.url ? pubData?.link_2?.url : "#"}
              target="_blank"
            >
              <AppButton>Voir les produits</AppButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-9 items-center justify-center mt-16">
        <AppText color="gray" size="xs">
          © 2025 beasebasket.com. Tous droits réservés.
        </AppText>
        <div className="flex gap-4 items-center social-media">
          <Link
            to={
              socialMediaLinks?.fb_link ? socialMediaLinks?.fb_link?.url : "#"
            }
            target="_blank"
          >
            <Icon name="FacebookIcon" />
          </Link>
          <Link
            to={
              socialMediaLinks?.instagram_link
                ? socialMediaLinks?.instagram_link?.url
                : "#"
            }
            target="_blank"
          >
            <Icon name="InstagramIcon" />
          </Link>
          <Link
            to={
              socialMediaLinks?.youtube_link
                ? socialMediaLinks?.youtube_link?.url
                : "#"
            }
            target="_blank"
          >
            <Icon name="YoutubeIcon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pub;
