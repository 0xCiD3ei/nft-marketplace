import MainLayout from "src/components/layouts/MainLayout";
import {Helmet} from "react-helmet";
import {useContext, useState} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import Input from "src/components/shared/Input/Input";
import FormItem from "src/components/app/FormItem";
import {RadioGroup} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/solid";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import NcImage from "src/components/shared/NcImage/NcImage";
import Label from "src/components/app/Label/Label";
import Textarea from "src/components/shared/Textarea/Textarea";
import {withSessionSsr} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import categoryService from "src/lib/services/categoryService";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import {useSnackbar} from "notistack";

export default function UploadItemPage({className = "", categories}) {
  const { enqueueSnackbar } = useSnackbar();
  const {createNFT, uploadToIPFS} = useContext(NFTMarketplaceContext);
  const [selected, setSelected] = useState(categories[0]._id);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    image: ""
  });
  const [loading, setLoading] = useState(false)
  
  const handleOnchangeFile = async (e) => {
    const url = await uploadToIPFS(e.target.files[0]);
    setFormValues({ ...formValues, image: url });
  };
  
  const handleOnchangeInput = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="upload-nft"
    >
      <Helmet>
        <title>Create Item || NFT React Template</title>
      </Helmet>
      
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Create New Item
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold">
                Image, Video, Audio, or 3D Model
              </h3>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleOnchangeFile(e)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ---- */}
            <FormItem label="Item Name">
              <Input
                placeholder="Enter NFT name"
                name="name"
                value={formValues.name}
                onChange={handleOnchangeInput}
              />
            </FormItem>
            
            {/* ---- */}
            <FormItem
              label="External link"
              desc="Ciscrypt will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  https://
                </span>
                <Input className="!rounded-l-none" placeholder="domain.com" />
              </div>
            </FormItem>
            
            {/* ---- */}
            <FormItem
              label="Description"
              desc={
                <div>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  The description will be included on the item's detail page
                  underneath its image.{" "}
                  <span className="text-green-500">Markdown</span> syntax is
                  supported.
                </div>
              }
            >
              <Textarea
                rows={6}
                className="mt-1.5"
                name="description"
                placeholder="Enter NFT Description"
                value={formValues.description}
                onChange={handleOnchangeInput}
              />
            </FormItem>
            
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            
            <div>
              <Label>Choose collection</Label>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose an exiting collection or create a new one
              </div>
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
                <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                  {categories.map((category, index) => (
                    <RadioGroup.Option
                      key={index}
                      value={category._id}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                            : ""
                        }
                    ${
                          checked
                            ? "bg-teal-600 text-white"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }
                      relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <div className="flex items-center justify-between">
                                  <RadioGroup.Description
                                    as="div"
                                    className={"rounded-full w-16"}
                                  >
                                    <NcImage
                                      containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                      src={category.image}
                                    />
                                  </RadioGroup.Description>
                                  {checked && (
                                    <div className="flex-shrink-0 text-white">
                                      <CheckIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                </div>
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-semibold mt-3 w-[126px]  ${
                                    checked ? "text-white" : ""
                                  }`}
                                >
                                  {category.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            {/* ---- */}
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              <ButtonPrimary
                loading={loading}
                className="flex-1"
                onClick={async () => {
                  setLoading(true)
                  const response = await createNFT({
                    name: formValues.name,
                    description: formValues.description,
                    image: formValues.image,
                    category: selected,
                  })
                  if(response.code === 200) {
                    enqueueSnackbar('Mint NFT successfully', {
                      variant: 'success'
                    });
                  }
                  setLoading(false);
                }}
              >
                Mint NFT
              </ButtonPrimary>
              <ButtonSecondary className="flex-1">Preview item</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UploadItemPage.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
)

export const getServerSideProps = withSessionSsr(async (ctx) => {
  await dbConnect();
  try {
    const data = await categoryService.getCategories();
    return {
      props: {
        categories: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true
    }
  }
})