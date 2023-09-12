import MainLayout from "src/components/layouts/MainLayout";
import {Helmet} from "react-helmet";
import Input from "src/components/shared/Input/Input";
import ButtonCircle from "src/components/shared/Button/ButtonCircle";
import HeaderFilterSearchPage from "src/components/app/HeaderFilterSearchPage";
import CardNFT from "src/components/app/CardNFT";
import BackgroundSection from "src/components/app/BackgroundSection/BackgroundSection";
import SectionSliderCollections from "src/components/app/SectionSliderCollections";
import SectionBecomeAnAuthor from "src/components/app/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import Pagination from "src/components/shared/Pagination/Pagination";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import {withSessionSsr} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import nftService from "src/lib/services/nftService";

export default function SearchPage({className= "", nfts, paginationOptions}) {
  
  return (
    <div className={`nc-PageSearch  ${className}`} data-nc-id="searchPage">
      <Helmet>
        <title>Search || Ciscryp NFT Template</title>
      </Helmet>
      
      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
      />
      
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
          <form className="relative w-full">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="shadow-lg border-0 dark:border"
                id="search-input"
                type="search"
                placeholder="Type your keywords"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
              >
                <i className="las la-arrow-right text-xl"></i>
              </ButtonCircle>
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          </form>
        </header>
      </div>
      
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}
          <HeaderFilterSearchPage />
          
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {nfts?.length > 0 ? (
              nfts.map((item) => <CardNFT
                key={item?.metadata?.id}
                nft={item?.metadata}
                price={item?.currencyValuePerToken}
                quantity={item?.supply}
              />
              )
            ) : (
              <p>Not listed</p>
            )}
          </div>
          
          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination paginationOptions={paginationOptions} />
            {
              paginationOptions?.totalPages > 1 && (
                <ButtonPrimary>Show me more</ButtonPrimary>
              )
            }
          </div>
        </main>
        
        {/* === SECTION 5 === */}
        <div className="relative py-16 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections />
        </div>
        
        {/* SUBCRIBES */}
        <SectionBecomeAnAuthor />
      </div>
    </div>
  );
}

SearchPage.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
)

export const getServerSideProps = withSessionSsr(async (ctx) => {
  await dbConnect();
  try {
    const response = await nftService.getAllNfts(1, 8);
    return {
      props: {
        nfts: JSON.parse(JSON.stringify(response.data)),
        paginationOptions: JSON.parse(JSON.stringify(response.paginationOptions)),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true
    }
  }
})