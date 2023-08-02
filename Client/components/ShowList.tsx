import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getItemsData } from "../services/ItemService";
import ExpenseTrackerForm from "./ExpenseTracker";

export default function ShowList() {
  const [items, setItems] = useState<IDataList[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [sum, setSum] = useState<number | null>(0);
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const data = await getItemsData();
        console.log(data);
        setItems(data);
        setSum(data.reduce((result, expense) => result + expense.price, 0));
        calculateShares(data);
      } catch (error: any) {
        console.error(error);
        setError(error);
      }
    };
    fetchItemData();
  }, [showForm]);

  const calculateShares = (data: IDataList[]) => {
    var rahulspent1: number = 0;
    var rameshspent1: number = 0;
    data.map((sams) =>
      sams.payeeName === "Rahul"
        ? (rahulspent1 = rahulspent1 + sams.price)
        : (rameshspent1 = rameshspent1 + sams.price)
    );
    setRahulSpent(rahulspent1);
    setRameshSpent(rameshspent1);
  };

  const getTableHeaders = () => {
    return (
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
    );
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={()=>setShowForm(true)}>
          Add
      </button>
      {
          showForm &&
          <div className="form">
              <ExpenseTrackerForm onClose={()=>setShowForm(false)}></ExpenseTrackerForm>
          </div>
      }
      {getTableHeaders()}
      {items && items.map((expenseItem)=>{
          return (
              <div key={expenseItem.id}>
                      <div className="use-inline date ">{expenseItem.setDate}</div>
        <div className="use-inline">{expenseItem.product}</div>
        <div className="use-inline price">{expenseItem.price}</div>
        <div className={`use-inline ${expenseItem.payeeName}`}>{expenseItem.payeeName}</div>
              </div>
          )
      })}
      <hr/>
      <div className="use-inline ">Total: </div>
        <span className="use-inline total">{sum}</span> <br />
        <div className="use-inline ">Rahul paid: </div>
        <span className="use-inline total Rahul">{rahulSpent}</span> <br />
        <div className="use-inline ">Ramesh paid: </div>
        <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
        <span className="use-inline payable">{rahulSpent>rameshSpent? "Pay Rahul " : "Pay Ramesh"}</span>
        <span className="use-inline payable price"> {Math.abs((rahulSpent-rameshSpent)/2)}</span>
        {
               error && (
                    <strong>
                        {error?.message}
                    </strong>
                )
            } 
    </>
  );
}