import MainLayout from "src/components/layouts/MainLayout";
import Head from "next/head";
import Image from "next/image";
import Vector1 from "src/assets/images/Vector1.png";
import BgGlassmorphism from "src/components/app/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "src/components/app/SectionHero/SectionHero";
import SectionHowItWork from "src/components/app/SectionHowItWork/SectionHowItWork";
import SectionLargeSlider from "src/components/containers/PageHome/SectionLargeSlider";
import SectionMagazine from "src/components/app/SectionMagazine";
import BackgroundSection from "src/components/app/BackgroundSection/BackgroundSection";
import SectionGridAuthorBox from "src/components/app/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionSliderCardNftVideo from "src/components/app/SectionSliderCardNftVideo";
import SectionSliderCollections from "src/components/app/SectionSliderCollections";
import SectionSubscribe from "src/components/app/SectionSubscribe/SectionSubscribe";
import SectionGridFeatureNFT from "src/components/containers/PageHome/SectionGridFeatureNFT";
import SectionSliderCategories from "src/components/app/SectionSliderCategories/SectionSliderCategories";
import SectionBecomeAnAuthor from "src/components/app/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "src/components/containers/PageHome/SectionVideos";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Ciscryp || NFT Marketplace Template</title>
      </Head>
      <div className="nc-PageHome relative overflow-hidden">
        {/* GLASSMOPHIN */}
        <BgGlassmorphism />
        
        <div className="container relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
          {/* SECTION HERO */}
          <SectionHero
            className="pb-10"
            heading={
              <span>
                Discover 🖼
                <br /> collect, and sell <br /> extraordinary {` `}
                <span className="relative pr-3">
                  <Image
                    className="w-full absolute bottom-3 -left-1"
                    src={Vector1}
                    alt="Vector1"
                  />
                  <span className="relative">NFTs</span>
                </span>
              </span>
            }
          />
          
          {/* SECTION 2 */}
          <SectionHowItWork />
        </div>
        
        {/* SECTION LAERGE SLIDER */}
        <div className="bg-neutral-100/80 dark:bg-black/20 py-20 lg:py-32">
          <div className="container">
            <SectionLargeSlider />
          </div>
        </div>
        
        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <SectionMagazine />
          
          {/* SECTION */}
          <div className="relative py-20 lg:py-28">
            <BackgroundSection />
            <SectionGridAuthorBox
              sectionStyle="style2"
              data={Array.from("11111111")}
              boxCard="box4"
            />
          </div>
          
          {/* SECTION 4 */}
          <SectionSliderCardNftVideo />
          
          {/* SECTION */}
          <div className="relative py-20 lg:py-28">
            <BackgroundSection />
            <SectionSliderCollections cardStyle="style2" />
          </div>
          
          {/* SECTION */}
          <SectionSubscribe />
          
          {/* SECTION */}
          <div className="relative py-20 lg:py-28">
            <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
            <SectionGridFeatureNFT />
          </div>
          
          {/* SECTION 1 */}
          <SectionSliderCategories />
          
          {/* SECTION */}
          <div className="relative py-20 lg:py-24">
            <BackgroundSection />
            <SectionBecomeAnAuthor />
          </div>
          
          {/* SECTION */}
          <SectionVideos />
        </div>
      </div>
    </>
  )
}

HomePage.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
)
