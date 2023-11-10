import MainLayout from "src/components/layouts/MainLayout";
import {Helmet} from "react-helmet";
import Label from "src/components/app/Label/Label";
import Input from "src/components/shared/Input/Input";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import {useAddress, useGrantRole, useRevokeRole} from "@thirdweb-dev/react";
import {useContext, useEffect, useState} from "react";
import {withSessionSsr} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import {useSnackbar} from "notistack";
import {ethers} from "ethers";
import {NFTMarketplaceContext} from "src/context/NFTMarketplaceContext";
import {OWNER_ADDRESS} from "src/constant/addresses";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import webClientService from "src/lib/services/webClientService";

export default function ApprovePage({className = "", account}) {
  const { enqueueSnackbar } = useSnackbar();
  const {nftCollection} = useContext(NFTMarketplaceContext);
  const [walletAddress, setWalletAddress] = useState('');
  const { mutateAsync: grantRole, isLoading: loadingGrant, error: errorGrant } = useGrantRole(nftCollection);
  const { mutateAsync: revokeRole, isLoading: loadingRevoke, error: errorRevoke } = useRevokeRole(nftCollection);
  const [addresses, setAddresses] = useState([]);
  
  console.log({addresses});
  
  const loadAddresses = async () => {
    const response = await webClientService.getAddressRole();
    if (response.code === 200) {
      setAddresses(response.data);
    }
  }
  
  useEffect(() => {
    loadAddresses().then();
  }, []);
  const onGrantRoleAddress = async () => {
    try {
      if(!ethers.utils.isAddress(walletAddress)) {
        enqueueSnackbar('Invalid wallet address', {
          variant: 'error'
        });
        return;
      }
      
      if (addresses.some(ele => ele?.address === walletAddress)) {
        enqueueSnackbar('This wallet address already has authority in this system', {
          variant: 'error'
        });
        return;
      }
      
      await grantRole({
        role: "minter",
        address: walletAddress,
      })
      console.log(errorGrant);
      setWalletAddress('');
      const response = await webClientService.grantRole({
        address: walletAddress
      })
      if(response?.code === 200) {
        loadAddresses().then();
        enqueueSnackbar(response?.message, {
          variant: 'success'
        });
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar('An error has occurred', {
        variant: 'error'
      });
    }
  }
  
  const onRevokeRoleAddress = async () => {
    try {
      if(!ethers.utils.isAddress(walletAddress)) {
        enqueueSnackbar('Invalid wallet address', {
          variant: 'error'
        });
        return;
      }
      
      await revokeRole({
        role: "minter",
        address: walletAddress,
      })
      console.log(errorRevoke);
      setWalletAddress('');
      const response = await webClientService.revokeRole({
        address: walletAddress
      })
      if(response?.code === 200) {
        loadAddresses().then();
        enqueueSnackbar(response?.message, {
          variant: 'success'
        });
      }
    }catch (e) {
      console.log(e);
      enqueueSnackbar('An error has occurred', {
        variant: 'error'
      });
    }
  }
  
  return (
    <div className={`nc-ApprovePage ${className}`} data-nc-id="ApprovePage">
      <Helmet>
        <title>Approve</title>
      </Helmet>
      
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Permission for mint NFT
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-5 sm:space-y-6 md:sm:space-y-7">
              {/* ---- */}
              <div>
                <Label>Address</Label>
                <Input
                  className="mt-1.5"
                  placeholder="Enter your address"
                  value={walletAddress}
                  name={"address"}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                  }}
                />
              </div>
              
              {/* ---- */}
              <div className="pt-2 flex items-center gap-2 justify-center">
                <ButtonSecondary
                  loading={loadingRevoke}
                  className="w-full"
                  onClick={onRevokeRoleAddress}
                >
                  Revoke Role
                </ButtonSecondary>
                <ButtonPrimary
                  loading={loadingGrant}
                  className="w-full"
                  onClick={onGrantRoleAddress}
                >
                  Grant Role
                </ButtonPrimary>
              </div>
            </div>
          </div>
          
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
              </thead>
              <tbody>
              {
                addresses.length > 0 && addresses.map((ele, index) => (
                  <tr key={ele} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {ele?.address || ''}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

ApprovePage.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
)

export const getServerSideProps = withSessionSsr(async (ctx) => {
  await dbConnect();
  try {
    return {
      props: {
        account: ctx.req.session.account,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true
    }
  }
})

