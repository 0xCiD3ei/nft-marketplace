// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTMarketplace is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemSold;
  
  uint256 listingPrice = 0.025 ether;
  address payable owner;
  
  constructor() ERC721("Non Fungible Token", "NFT"){
    owner = payable(msg.sender);
  }
  
  struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
    bool auction;
  }
  
  mapping(uint256 => MarketItem) private nftImages;
  
  event MarketItemCreated (
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold,
    bool auction
  );
  
  modifier onlyOwner() {
    require(owner == msg.sender, "Only owner of the marketplace can change the listing price");
    _;
  }
  
  function createToken(string memory tokenURI, uint256 price, bool auction) public payable returns (uint256) {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    createMarketItem(newTokenId, price);
    return newTokenId;
  }
  
  function createMarketItem(uint256 _tokenId, uint256 _price) private {
    require(_price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    
    nftImages[_tokenId] = MarketItem(
      _tokenId,
      payable(msg.sender),
      payable(address(this)),
      _price,
      false
    );
    
    _transfer(msg.sender, address(this), _tokenId);
    emit MarketItemCreated(
      tokenId,
      msg.sender,
      address(this),
      price,
      false,
      false
    );
  }
  
  function createMarkerSale(uint256 _tokenId) public payable{
    uint256 price = nftImages[_tokenId].price;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");
    
    nftImages[_tokenId].owner = payable(msg.sender);
    nftImages[_tokenId].sold = true;
    nftImages[_tokenId].seller = payable(address(this));
    _itemSold.increment();
    payable(owner).transfer(listingPrice);
    payable(nftImages[_tokenId].seller).transfer(msg.value);
  }
  
  function resellToken(uint256 _tokenId, uint256 _price) public payable  {
    require(nftImages[_tokenId].owner == msg.sender, "Only item owner can perform this operation");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    
    nftImages[_tokenId].sold = false;
    nftImages[_tokenId].price = _price;
    nftImages[_tokenId].seller = payable(msg.sender);
    nftImages[_tokenId].owner = payable(address(this));
    _itemSold.decrement();
    
    _transfer(msg.sender, address(this), _tokenId);
  }
  
  function getListingPrice() public view returns(uint256) {
    return listingPrice;
  }
  
  function updateListingPrice(uint256 _listingPrice, address _owner) public payable {
    require(owner == _owner, "Only contract owner can update listing price");
    listingPrice = _listingPrice;
  }
  
  function getAllNFTs() public view returns(MarketItem[] memory) {
    uint256 itemCount = _tokenIds.current();
    uint256 unsoldItemCount = _tokenIds.current() - _itemSold.current();
    uint256 currentIndex = 0;
    
    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for(uint256 i = 0; i < itemCount; i++) {
      if(nftImages[i + 1].owner == address(this)) {
        uint256 currentId = i + 1;
        MarketItem storage currentItem = nftImages[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
  
  function getNFTsListed() public view returns(MarketItem[] memory) {
    uint256 totalItemCount = _tokenIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;
    
    for(uint256 i = 0; i < totalItemCount; i++) {
      if(nftImages[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }
    MarketItem[] memory items = new MarketItem[](itemCount);
    for(uint256 i = 0; i < totalItemCount; i++) {
      if(nftImages[i + 1].creator == msg.sender) {
        uint256 currentId = i + 1;
        MarketItem[] storage currentItem = nftImages[currentId];
        items[currentIndex] == currentItem;
        currentIndex +=1;
      }
    }
    return items;
  }
  
  function getMyNFTs() public view returns(MarketItem[] memory) {
    uint256 totalItemCount = _tokenIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;
    
    for(uint256 i = 0; i < totalItemCount; i++) {
      if(nftImages[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }
    
    MarketItem[] memory items = new MarketItem[](itemCount);
    for(uint256 i = 0; i < totalItemCount; i++) {
      if(nftImages[i + 1].owner == msg.sender) {
        uint256 currentId = i + 1;
        MarketItem[] storage currentItem = nftImages[currentId];
        currentIndex += 1;
      }
    }
    return items;
  }
}
