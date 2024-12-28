ENDPONT SPECIFICATION:

1.

GET /api/customers/authorization/{userId}

Input userID (any string or number will do)
example: http://localhost:3000/api/customers/authorize/1at

Output: A jwt token to use for the route with summary( Or any potential route in the future)
example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhdCIsImlhdCI6MTczNTM0MjM4NywiZXhwIjoxNzM1MzQ1OTg3fQ.BkhO9y0JOqlTkdc31FDRHMw5n5vvrpS8RGjoUrDo53w'

NB: This route wasn't required in the task, however in order to protect the routes from any potential unauthorized use(much like in the real app) this route was created. As it is considered the best practice in the industry presently

2.

GET /api/customers/{customer_id}/summary

Input customerID (any string or number will do)
requierd headers: 'Authorization': 'Bearer token'
*token - is he noken resived from the /api/customers/authorization/{userId} route
expamle: http://localhost:3000/api/customers/1gt6ah4/summary

Output : customer data with the next structure:
{
    "address": "string",
    "billing_info": "string",
    "invocies": "string",
    "orders": "string" or [],
    "jobs": [],
    "delivery_info": []
}

If some of the info wasn't foud in the coresponsive field we'll have 'not found' as a value, if there was no orders to get info about the jobs or delivery,coresponsive arrays will contain 'not provided' as an only value;

example:
{
    "address": "not found",
    "billing_info": "not found",
    "invocies": "not found",
    "orders": "not found",
    "jobs": [
        "not provided"
    ],
    "delivery_info": [
        "not provided"
    ]
}