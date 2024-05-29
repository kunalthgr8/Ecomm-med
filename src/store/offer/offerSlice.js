import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    code: "BIG20",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1710162798_Vicks_mini_webdddd.jpg",
    description:
      "Today only! Get Flat 20% OFF* (max. discount: Rs. 2000) on PrePaid/COD medicine orders...",
    validity: "31 Dec 2021",
    discount: 20, // 20% off
  },
  {
    code: "SPECIAL50",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1710162682_Amore_mini_web.jpg",
    description:
      "Special offer! Get 50% OFF* (max. discount: Rs. 500) on all orders above Rs. 1000...",
    validity: "15 Jan 2022",
    discount: 50, // 50% off
  },
  {
    code: "SALE30",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1710162640_Ahaglow_Mini_banner_webhbh.jpg",
    description:
      "Limited time sale! Get 30% OFF* (max. discount: Rs. 1000) on selected products...",
    validity: "10 Feb 2022",
    discount: 30, // 30% off
  },
  {
    code: "FLAT25",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1710162852_Omnigel_Mini_banner_webhhhh.jpg",
    description:
      "Flat 25% OFF* (max. discount: Rs. 1500) on all orders above Rs. 800...",
    validity: "28 Feb 2022",
    discount: 25, // 25% off
  },
  {
    code: "WEEKEND40",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1709289702_Hansaplast_mini_web.jpg",
    description:
      "Weekend special! Get 40% OFF* (max. discount: Rs. 2000) on all orders above Rs. 1200...",
    validity: "05 Mar 2022",
    discount: 40, // 40% off
  },
  {
    code: "SPRING15",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1710826345_Mini_web.jpg",
    description:
      "Spring sale! Get 15% OFF* (max. discount: Rs. 800) on all orders above Rs. 600...",
    validity: "20 Mar 2022",
    discount: 15, // 15% off
  },
  {
    code: "FREESHIP",
    image:
      "https://www.netmeds.com/images/cms/aw_rbslider/slides/1709533031_Vitamin-Store-Mini-banner_web.jpg",
    description: "Free shipping on all orders above Rs. 500...",
    validity: "30 Apr 2022",
    discount: 0, // 0% off (free shipping)
  },
];

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    addOffer: (state, action) => {
      state.push(action.payload);
    },
    removeOffer: (state, action) => {
      return state.filter((x) => x.code !== action.payload);
    },
  },
});

export const { addOffer, removeOffer } = offerSlice.actions;

export default offerSlice.reducer;
