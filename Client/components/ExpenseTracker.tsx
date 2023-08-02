import { ChangeEvent, Component, FormEvent } from "react";
import { pushData } from "../services/ItemService";

type Props = {
    onClose: any
};

type State = {
  product: string;
  price: number;
  payeeName: string;
  setDate: string;
};

export default class ExpenseTrackerForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      product: "",
      price: 0,
      payeeName: "",
      setDate: "",
    };
  }

  submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    // call api to create new purchase
       event.preventDefault();
         // console.log(this.state)
         const finalData = {
             ...this.state
         }
         const data = await pushData(finalData);
         console.log(data);
         this.props.onClose();
  };

  setProduct = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      product: event.target.value,
    });
  };
  setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      payeeName: event.target.value,
    });
  };

  setPrice = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      price: parseInt(event.target.value),
    });
  };

  loggedDate = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    // console.log(typeof (e.target.value))

    this.setState({
      setDate: e.target.value,
    });
  };

  render() {
    return (
      <>
        <section>
          <header>
            <h1>Add New Item</h1>
            <p>
              Read the below instructions before proceeding:
              <br /> Make sure you fill all the fileds where * is provided
            </p>
          </header>

          <form onSubmit={this.submitHandler}>
            <article>
              <p>Name</p>
              <select
                name="Name"
                required
                value={this.state.payeeName}
                onChange={this.setPayee}
              >
                <option value="" defaultChecked>
                  Choose
                </option>
                <option value="Rahul">Rahul</option>
                <option value="Ramesh">Ramesh</option>
              </select>
            </article>
            <article>
              <p>Product Purchased</p>
              <input
                type="text"
                required
                value={this.state.product}
                onChange={this.setProduct}
              ></input>
            </article>
            <article>
              <p>Price</p>
              <input
                type="number"
                required
                value={this.state.price}
                onChange={this.setPrice}
              />
            </article>

            <article>
              <p>Date</p>
              <input
                type="date"
                required
                value={this.state.setDate}
                onChange={this.loggedDate}
              />
            </article>
            <button type="button" className="form-button" onClick={this.props.onClose}>
              Close
            </button>

            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        </section>
      </>
    );
  }
}