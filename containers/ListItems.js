import * as React from "react";
import differenceInSeconds from "date-fns/differenceInSeconds";

async function fetchItems(setItems) {
  const response = await fetch(`/api/get-items`);
  const jsonResponse = await response.json();
  const items = jsonResponse.items;
  setItems(items);
}

function createCountDown(elementId, seconds) {
  
	var x = setInterval(function() {
    let items = items.filter((item) => item.id == elementId).map(item => (
      
    //  return(
    //   Math.max(
    //     differenceInSeconds(new Date(item.expiresIn), now),0)
    //  )
    //     expirySeconds :
    console.log(elementId) 
      
    ))
	  document.getElementById(elementId).innerHTML = seconds ;
	  if (seconds <=  0) {
		clearInterval(x);
		document.getElementById(elementId).innerHTML = "ORDER EXPIRED";
	  }
	}, 1000);
}

const ListItems = () => {
  const [items, setItems] = React.useState([]);
  const now = new Date();

  React.useEffect(() => {
    fetchItems(setItems);
  }, []);


  return (
    <div
      style={{
        maxWidth: "600px",
      }}
    >
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item.id}>
            <div className="container-sm">
              <div className="row">
                <div className="col-2">
                  <span title={`ID: ${item.id}`}>
                    #{item.id.slice(0, 3)}
                    {"\u2026"}
                  </span>
                </div>
                <div className="col-6">{item.name}</div>
                <div className="col-4 text-right">
                  expires in{" "}
                  <span className="badge badge-secondary" id={item.id}>
                  {createCountDown(item.id)}
                    {" "}
                    s

                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <span id = "countdown"> {createCountDown("countdown", 999)}</span>
    </div>
  );
};

export default ListItems;
