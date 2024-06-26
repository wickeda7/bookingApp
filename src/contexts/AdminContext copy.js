import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeServices, setStoreServices] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [amountPerTurn, setAmountPerTurn] = useState(null);
  const [setTurn, setSetTurn] = useState(null);
  const [newService, setNewService] = useState(null);
  const [showExtend, setShowExtend] = useState(false);
  const [extendServices, setExtendServices] = useState(null);
  const [extendTotal, setExtendTotal] = useState(0);
  const [extendTotalAdditional, setExtendTotalAdditional] = useState(0);
  const [extendSubTotal, setExtendSubTotal] = useState(0);
  const [extendTip, setExtendTip] = useState(0);
  const [payBy, setPayBy] = useState('cash');
  const [fees, setFees] = useState(0);
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(0);

  const feesAmount = 2;

  useEffect(() => {
    console.log('extendTotal', extendTotal);
    console.log('payBy', payBy);
    if (payBy === 'cash') {
      setCard(0);
      setFees(0);
      setCash(extendTotal);
    } else if (payBy === 'card') {
      setCash(0);
      setFees(feesAmount);
      setCard(extendTotal + feesAmount);
    }
  }, [payBy, extendTotal]);

  useEffect(() => {
    if (payBy === 'card') {
      setCard(extendTotal);
    } else if (payBy === 'cash') {
      setCash(extendTotal);
    } else {
    }
  }, [extendTip, fees, extendTotalAdditional]);

  useEffect(() => {
    if (card === 0) return;
    setFees(2);
  }, [card]);

  const getToken = async () => {
    console.log('getToken');
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        key: 'WPd4NnbzHiXYW8I1u9uDTZ3vV88v-ei5O2m26mr1',
        merchant_id: '714D3386-A9C9-3BF8-8DE9-C98AD5623331',
      }),
    };
    const url = `https://api.sandbox-paidyet.com/v3/`;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      key: 'WPd4NnbzHiXYW8I1u9uDTZ3vV88v-ei5O2m26mr1',
      merchant_id: '714D3386-A9C9-3BF8-8DE9-C98AD5623331',
    });
    try {
      const res = await axios.post(`${url}login`, body, {
        headers: headers,
      });
      const token = res.data.result.token;
      console.log('token', token);
      //return res.data.result.token;
      if (token) {
        // console.log('token', res.data.result.token);
        // return res.data.result.token;
        const temp = await sendInfo(token);
        console.log('temp', temp);
      }
    } catch (error) {
      console.log('error', error);
    }

    // fetch('login', options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
  };
  const sendInfo = async (token) => {
    const url = `https://api.sandbox-paidyet.com/v3/`;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({ type: 'sale', amount: 1 });
    try {
      const res = await axios.post('https://api.sandbox-paidyet.com/v3/device/1760025430/transaction', body, {
        headers: headers,
      });
      console.log('res', res);
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     accept: 'application/json',
      //     'content-type': 'application/json',
      //     authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({ type: 'sale', amount: 1 }),
      // };

      // fetch('https://api.sandbox-paidyet.com/v3/device/1760025430/transaction', options)
      //   .then((response) => response.json())
      //   .then((response) => console.log(response))
      //   .catch((err) => console.error(err));
    } catch (error) {
      console.log('error', error.message);
      console.log('error', error);
    }
  };
  const value = {
    visible,
    setVisible,
    imageType,
    setImageType,
    selectedImage,
    setSelectedImage,
    storeInfo,
    setStoreInfo,
    storeServices,
    setStoreServices,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,
    amountPerTurn,
    setAmountPerTurn,
    setTurn,
    setSetTurn,
    newService,
    setNewService,
    showExtend,
    setShowExtend,
    extendServices,
    setExtendServices,
    extendTotal,
    setExtendTotal,
    extendTotalAdditional,
    setExtendTotalAdditional,
    extendSubTotal,
    setExtendSubTotal,
    extendTip,
    setExtendTip,
    payBy,
    setPayBy,
    fees,
    setFees,
    cash,
    setCash,
    card,
    setCard,
    getToken,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
