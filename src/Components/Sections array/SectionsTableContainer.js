import React from 'react'
import SectionsTable from './SectionsTable'




const initRows_product = [
  {
    id:1,
    isChecked:false,
    description:"Listing products"
  },
  {
    id:2,
    isChecked:false,
    description:"desc2"
  },
  {
    id:3,
    isChecked:false,
    description:"desc3"
  },
  {
    id:4,
    isChecked:false,
    description:"desc4"
  }

];

const initRows_stock = [
  {
    id:1,
    isChecked:false,
    description:"stock1"
  },
  {
    id:2,
    isChecked:false,
    description:"desc2"
  },
  {
    id:3,
    isChecked:false,
    description:"desc3"
  },
  {
    id:4,
    isChecked:false,
    description:"desc4"
  }

];

const initRows_order = [
  {
    id:1,
    isChecked:false,
    description:"order1"
  },
  {
    id:2,
    isChecked:false,
    description:"desc2"
  },
  {
    id:3,
    isChecked:false,
    description:"desc3"
  },
  {
    id:4,
    isChecked:false,
    description:"desc4"
  }

];

const initRows_purchase = [
  {
    id:1,
    isChecked:false,
    description:"purchase1"
  },
  {
    id:2,
    isChecked:false,
    description:"desc2"
  },
  {
    id:3,
    isChecked:false,
    description:"desc3"
  },
  {
    id:4,
    isChecked:false,
    description:"desc4"
  }

];

const reducer = (state,action)=>{
      switch (action.type) {
        case 'update':
          return state.map(elem=>(
            elem.id === action.id?{...elem,isChecked:!elem.isChecked}:elem
          ));
          default:
            return state
      }
}
function SectionsTableContainer() {

    const [choosedSection, setChoosedSection] = React.useState('products');
    const [products_rows, dispatch_products] = React.useReducer(reducer,initRows_product );
    const [orders_rows, dispatch_orders] = React.useReducer(reducer,initRows_order );
    const [purchases_rows, dispatch_purchases] = React.useReducer(reducer,initRows_purchase );
    const [stocks_rows, dispatch_stocks] = React.useReducer(reducer,initRows_stock);


    console.log('HERE',products_rows)

    const handleChoosedSectionChange = (event) => {
        setChoosedSection(event.target.value)
      };


    const dispatch_products_handler = (id,value) =>{
      dispatch_products({type:'update',id:id,value:value})
    }

    const dispatch_orders_handler = (id,value) =>{
      dispatch_orders({type:'update',id:id,value:value})
    }

    const dispatch_purchases_handler = (id,value) =>{
      dispatch_purchases({type:'update',id:id,value:value})
    }

    const dispatch_stock_handler = (id,value) =>{
      dispatch_stocks({type:'update',id:id,value:value})
    }
    return (
      <>
      {
        choosedSection === 'products' && 
          <SectionsTable choosedSection={choosedSection} handleChoosedSectionChange={handleChoosedSectionChange} rows={products_rows} dispatcher = {dispatch_products_handler} />
      }

      {
        choosedSection === 'stock' && 
          <SectionsTable choosedSection={choosedSection} handleChoosedSectionChange={handleChoosedSectionChange} rows={stocks_rows} dispatcher = {dispatch_stock_handler} />
      }

      {
        choosedSection === 'orders' && 
          <SectionsTable choosedSection={choosedSection} handleChoosedSectionChange={handleChoosedSectionChange} rows={orders_rows} dispatcher = {dispatch_orders_handler} />
      }
      {
        choosedSection === 'purchases' && 
          <SectionsTable choosedSection={choosedSection} handleChoosedSectionChange={handleChoosedSectionChange} rows={purchases_rows} dispatcher = {dispatch_purchases_handler} />
      }
      </>
    )
}

export default SectionsTableContainer
