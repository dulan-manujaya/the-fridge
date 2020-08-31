import * as React from "react";

var itemName;
var expiryTime;

async function fetchItems(setItems) {
  const response = await fetch(`/api/get-items`);
  const jsonResponse = await response.json();
  const items = jsonResponse.items;
  setItems(items);
  
}

async function formSubmitHandler(items, setItemNameSmallTag) {
 

  var index = items.findIndex((item) => item.name == itemName)
  
  if(index != -1)
  {
    setItemNameSmallTag(true)
  }
  else
  {
    setItemNameSmallTag(false)

    const requestbody = {

      name : itemName,
      expiresAfterSeconds :expiryTime

    }
 
    const response = await fetch(`/api/add-item`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(requestbody)
  
     
    });
    const jsonResponse = await response.json();
    //console.log('jsonResponse *********************************************** ')
    //console.log(jsonResponse)
  }
}

const NewItemForm = () => {

  const [items, setItems] = React.useState([]);
  const [itemNameSmallTag, setItemNameSmallTag] = React.useState(false);

  React.useEffect(() => {
    fetchItems(setItems);
  }, []);

  return (
    <form>
      <div className="form-row">
        <div className="form-group col-md-8">
          <label htmlFor="formItemName">Item name</label>
          <input
            type="text"
            className="form-control"
            id="formItemName"
            aria-describedby="itemNameHelp"
            placeholder="yummy food"
            onChange={(event) => (itemName = event.target.value)}
          />
          <small id="itemNameHelp" className="form-text text-muted" hidden = {!itemNameSmallTag}>
            We don't want more than one piece of the same food in our fridge.
          </small>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-3">
          <label htmlFor="formExpiresAfterSeconds">Expires after</label>
          <div className="input-group">
            <input
              type="text" 
              maxLength="3"
              className="form-control"
              id="formExpiresAfterSeconds"
              aria-label="Expires in"
              aria-describedby="basic-addon2"
             onChange={(event) => (expiryTime = event.target.value)}
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                seconds
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={e =>formSubmitHandler(items, setItemNameSmallTag)}
      >
        Submit
      </button>
    </form>
  );
};

export default NewItemForm;
