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
import React, {useEffect, useState} from "react";
import account from "src/pages/api/v1/account";

export default function SearchPage({className= "", nfts, paginationOptions}) {
  const [data, setData]  = useState(nfts);
  const [searchInput, setSearchInput] = useState('');
  const [tabActive, setTabActive] = React.useState("all");
  const tabs = [{
    key: 'all',
    label: 'All NFTs'
  }, {
    key: 'arts',
    label: 'Arts'
  }, {
    key: 'entertainment',
    label: 'Entertainment'
  }, {
    key: 'music',
    label: 'Musics'
  }, {
    key: 'news',
    label: 'News'
  }, {
    key: 'science',
    label: 'Science'
  }, {
    key: 'sports',
    label: 'Sports'
  }]
  const handleOnChangeInput = (e) => {
    setSearchInput(e.target.value);
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    const nftsFilter = nfts.filter((nft) => nft?.metadata?.name?.toLowerCase().includes(searchInput.toLowerCase()));
    setData(nftsFilter);
  }
  
  const handleActiveTab = (tab) => {
    setTabActive(tab);
    if(tab === 'all') {
      setData(nfts);
      return;
    }
    const nftsFilter = nfts.filter((nft) => nft?.metadata?.category?.name?.toLowerCase() === tab);
    setData(nftsFilter);
  }
  
  const handleRangePrice = (rangePrice) => {
    console.log(rangePrice);
  }
  
  const handleSaleStates = (states) => {
    console.log(states);
  }
  
  const handleSortOrderStates = (states) => {
    console.log(states);
  }
  
  const handleUpdateData = (direct, auction) => {
    // if(direct?.length > 0) {
    //   const nft = data?.filter(ele => ele?.metadata?.id === direct[0]?.id);
    //   return setData([...data, {
    //     ...nft, ...direct
    //   }]);
    // } else if(auction?.length > 0) {
    //   const nft = data?.filter(ele => ele?.metadata?.id === auction[0]?.id);
    //   return setData([...data, {
    //     ...nft, ...auction
    //   }])
    // }
  }
  
  console.log(data);
  
  return (
    <div className={`nc-PageSearch  ${className}`} data-nc-id="searchPage">
      <Helmet>
        <title>Explore</title>
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
                value={searchInput}
                name='search'
                onChange={handleOnChangeInput}
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
                onClick={handleSearch}
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
          <HeaderFilterSearchPage
            onActiveTab={handleActiveTab}
            tabs={tabs}
            tabActive={tabActive}
            onRangePrice={handleRangePrice}
            onSaleStates={handleSaleStates}
            onSortOrderStates={handleSortOrderStates}
          />
          
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {data?.length > 0 ? (
              data.map((item) => <CardNFT
                key={item?.metadata?.id}
                nft={item}
                quantity={item?.supply}
                onUpdateData={handleUpdateData}
              />
              )
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>There aren't any NFTs</p>
            )}
          </div>
          
          {/* PAGINATION */}
          {/*<div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">*/}
          {/*    <Pagination paginationOptions={paginationOptions} />*/}
          {/*  {*/}
          {/*    paginationOptions?.totalPages > 1 && (*/}
          {/*      <ButtonPrimary>Show me more</ButtonPrimary>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</div>*/}
        </main>
        
        {/* === SECTION 5 === */}
        {/*<div className="relative py-16 lg:py-28">*/}
        {/*  <BackgroundSection />*/}
        {/*  <SectionSliderCollections />*/}
        {/*</div>*/}
        
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
    const response = await nftService.getAllNfts(1, 99);
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