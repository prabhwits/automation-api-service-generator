export const search = {
    additionalProperties: false,
    type: "object",
    properties: {
        context: {
            description: "Describes a ONDC message context",
            type: "object",
            properties: {
                domain: {
                    description: "Codification of domain for ONDC",
                    type: "string",
                },
                country: {
                    type: "string",
                    description:
                        "Country code as per ISO 3166 Alpha-3 code format",
                },
                city: {
                    type: "string",
                    description:
                        "Codification of city code will be using the std code of the city e.g. for Bengaluru, city code is 'std:080'",
                },
                action: {
                    type: "string",
                    description:
                        "Defines the ONDC API call. Any actions other than the enumerated actions are not supported by ONDC Protocol",
                },
                core_version: {
                    type: "string",
                    description:
                        "Version of ONDC core API specification being used",
                },
                bap_id: {
                    type: "string",
                    description:
                        "Unique id of the Buyer App. By default it is the fully qualified domain name of the Buyer App",
                },
                bap_uri: {
                    type: "string",
                    format: "uri",
                    description:
                        "URI of the Buyer App for accepting callbacks. Must have the same domain name as the bap_id",
                },
                bpp_id: {
                    type: "string",
                    description:
                        "Unique id of the Seller App. By default it is the fully qualified domain name of the Seller App, mandatory for all peer-to-peer API requests, i.e. except search and on_search",
                },
                bpp_uri: {
                    type: "string",
                    format: "uri",
                    description:
                        "URI of the Seller App. Must have the same domain name as the bap_id, mandatory for all peer-to-peer API requests, i.e. except search and on_search",
                },
                transaction_id: {
                    type: "string",
                    description:
                        "This is a unique value which persists across all API calls from search through confirm",
                },
                message_id: {
                    type: "string",
                    description:
                        "This is a unique value which persists during a request / callback cycle",
                },
                timestamp: {
                    type: "string",
                    format: "date-time",
                    description: "Time of request generation in RFC3339 format",
                },
                key: {
                    type: "string",
                    description: "The encryption public key of the sender",
                },
                ttl: {
                    type: "string",
                    description:
                        "Timestamp for which this message holds valid in ISO8601 durations format - Outer limit for ttl for search, select, init, confirm, status, track, cancel, update, rating, support is 'PT30S' which is 30 seconds, different buyer apps can change this to meet their UX requirements, but it shouldn't exceed this outer limit",
                },
            },
        },
        message: {
            type: "object",
            properties: {
                intent: {
                    description:
                        'Intent of a user. Used for searching for services. Buyer App can set finder fee type in payment."@ondc/org/buyer_app_finder_fee_type" and amount in "@ondc/org/buyer_app_finder_fee_amount"',
                    type: "object",
                    properties: {
                        fulfillment: {
                            description:
                                "Describes how a single product/service will be rendered/fulfilled to the end customer",
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                    description:
                                        'This describes the type of fulfillment ("Pickup" - Buyer picks up from store by themselves or through their logistics provider; "Delivery" - seller delivers to buyer)',
                                },
                                end: {
                                    description:
                                        "Details on the end of fulfillment",
                                    type: "object",
                                    properties: {
                                        location: {
                                            description: "Describes an address",
                                            type: "object",
                                            properties: {
                                                area_code: {
                                                    type: "string",
                                                    description:
                                                        "Area code. This can be Pincode, ZIP code or any equivalent",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        payment: {
                            description: "Describes a payment.",
                            type: "object",
                            properties: {
                                "@ondc/org/buyer_app_finder_fee_type": {
                                    type: "string",
                                },
                                "@ondc/org/buyer_app_finder_fee_amount": {
                                    description: "Describes a decimal value",
                                    type: "string",
                                    pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                            },
                        },
                        category: {
                            description: "Describes a category",
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    description: "Unique id of the category",
                                },
                            },
                        },
                        item: {
                            description: "Describes a item",
                            type: "object",
                            properties: {
                                descriptor: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
