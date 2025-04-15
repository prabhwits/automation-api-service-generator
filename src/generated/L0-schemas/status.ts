export const status = {
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
                order_id: {
                    type: "string",
                    description:
                        "Unique identifier for Order across the network",
                },
            },
        },
    },
};
