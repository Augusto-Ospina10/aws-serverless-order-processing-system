const API_URL =
"https://f3zbl9v0lj.execute-api.us-east-1.amazonaws.com/prod/orders";

const form = document.getElementById("orderForm");
const button = document.getElementById("submitBtn");
const result = document.getElementById("result");

form.addEventListener("submit", submitOrder);

async function submitOrder(e){

    e.preventDefault();

    button.disabled = true;
    button.innerHTML = "Processing...";

    const data = {

        customerName:
        document.getElementById("customerName").value,

        email:
        document.getElementById("email").value,

        product:
        document.getElementById("product").value,

        quantity:
        Number(document.getElementById("quantity").value)

    };

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        if(response.ok){

            result.innerHTML=`
            <div class="alert alert-success">

                <h5>✅ Order Submitted Successfully</h5>

                <p>
                    Your order has entered the AWS event-driven workflow.
                    A confirmation email will arrive shortly.
                </p>

            </div>`;

            form.reset();

            document.getElementById("quantity").value=1;

        }

        else{

            result.innerHTML=`
            <div class="alert alert-danger">

                Unable to submit your order.

            </div>`;

        }

    }

    catch(error){

        result.innerHTML=`
        <div class="alert alert-danger">

            ${error}

        </div>`;

    }

    button.disabled=false;

    button.innerHTML="Submit Order";

}