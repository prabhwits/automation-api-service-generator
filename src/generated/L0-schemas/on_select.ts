export const on_select = {
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
                order: {
                    description: "Describes the details of an order",
                    type: "object",
                    properties: {
                        provider: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    description: "Id of the provider",
                                },
                                locations: {
                                    type: "array",
                                    maxItems: 1,
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        items: {
                            type: "array",
                            items: {
                                description:
                                    "Describes a product or a service offered to the end consumer by the provider",
                                type: "object",
                                properties: {
                                    id: {
                                        description:
                                            "This is the most unique identifier of a service item. An example of an Item ID could be the SKU of a product.",
                                        type: "string",
                                    },
                                    fulfillment_id: {
                                        type: "string",
                                        description:
                                            "Unique reference ID to the fulfillment of an order",
                                    },
                                    fulfillment_ids: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            description:
                                                "Unique reference ID to the fulfillment of an order",
                                        },
                                    },
                                    tags: {
                                        description:
                                            "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
                                        type: "object",
                                        properties: {
                                            code: {
                                                description:
                                                    "The machine-readable name of the tag group. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value. Values outside the allowed values may or may not be ignored by the rendering platform. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
                                                type: "string",
                                            },
                                            name: {
                                                description:
                                                    "A human-readable string describing the heading under which the tags are to be displayed. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using code property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency. As this schema is purely for catalog display purposes, it is not recommended to send this value during `search`.",
                                                type: "string",
                                            },
                                            list: {
                                                description:
                                                    "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
                                                type: "array",
                                                items: {
                                                    description:
                                                        "Describes a tag. This is a simple key-value store which is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
                                                    type: "object",
                                                    properties: {
                                                        code: {
                                                            description:
                                                                "The machine-readable name of the tag. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value.",
                                                            type: "string",
                                                        },
                                                        name: {
                                                            description:
                                                                "The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using the `code` property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency.",
                                                            type: "string",
                                                        },
                                                        value: {
                                                            description:
                                                                "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
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
                        offers: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    tags: {
                                        description:
                                            "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
                                        type: "object",
                                        properties: {
                                            code: {
                                                description:
                                                    "The machine-readable name of the tag group. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value. Values outside the allowed values may or may not be ignored by the rendering platform. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
                                                type: "string",
                                            },
                                            name: {
                                                description:
                                                    "A human-readable string describing the heading under which the tags are to be displayed. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using code property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency. As this schema is purely for catalog display purposes, it is not recommended to send this value during `search`.",
                                                type: "string",
                                            },
                                            list: {
                                                description:
                                                    "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
                                                type: "array",
                                                items: {
                                                    description:
                                                        "Describes a tag. This is a simple key-value store which is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
                                                    type: "object",
                                                    properties: {
                                                        code: {
                                                            description:
                                                                "The machine-readable name of the tag. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value.",
                                                            type: "string",
                                                        },
                                                        name: {
                                                            description:
                                                                "The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using the `code` property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency.",
                                                            type: "string",
                                                        },
                                                        value: {
                                                            description:
                                                                "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
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
                        fulfillments: {
                            type: "array",
                            items: {
                                description:
                                    "Describes how a single product/service will be rendered/fulfilled to the end customer",
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        description:
                                            "Unique reference ID to the fulfillment of an order",
                                    },
                                    type: {
                                        type: "string",
                                        description:
                                            'This describes the type of fulfillment ("Pickup" - Buyer picks up from store by themselves or through their logistics provider; "Delivery" - seller delivers to buyer)',
                                    },
                                    "@ondc/org/category": {
                                        type: "string",
                                        description: "Fulfillment Category",
                                    },
                                    "@ondc/org/TAT": {
                                        description:
                                            "fulfillment turnaround time in ISO8601 durations format e.g. 'PT24H' indicates 24 hour TAT",
                                        type: "string",
                                    },
                                    state: {
                                        description: "Describes a state",
                                        type: "object",
                                        properties: {
                                            descriptor: {
                                                description:
                                                    "Describes the description of a real-world object.",
                                                type: "object",
                                                properties: {
                                                    name: {
                                                        type: "string",
                                                    },
                                                    code: {
                                                        type: "string",
                                                    },
                                                    symbol: {
                                                        type: "string",
                                                    },
                                                    short_desc: {
                                                        type: "string",
                                                    },
                                                    long_desc: {
                                                        type: "string",
                                                    },
                                                    images: {
                                                        type: "array",
                                                        items: {
                                                            description:
                                                                "Image of an object. <br/><br/> A url based image will look like <br/><br/>```uri:http://path/to/image``` <br/><br/> An image can also be sent as a data string. For example : <br/><br/> ```data:js87y34ilhriuho84r3i4```",
                                                            type: "string",
                                                        },
                                                    },
                                                },
                                            },
                                            updated_at: {
                                                type: "string",
                                                format: "date-time",
                                            },
                                            updated_by: {
                                                type: "string",
                                                description:
                                                    "ID of entity which changed the state",
                                            },
                                        },
                                    },
                                    tracking: {
                                        type: "boolean",
                                        description:
                                            "Indicates whether the fulfillment allows tracking",
                                        default: false,
                                    },
                                    start: {
                                        description:
                                            "Details on the end of fulfillment",
                                        type: "object",
                                        properties: {
                                            time: {
                                                description:
                                                    "Describes time in its various forms. It can be a single point in time; duration; or a structured timetable of operations",
                                                type: "object",
                                                properties: {
                                                    range: {
                                                        type: "object",
                                                        properties: {
                                                            start: {
                                                                type: "string",
                                                                format: "date-time",
                                                            },
                                                            end: {
                                                                type: "string",
                                                                format: "date-time",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    end: {
                                        description:
                                            "Details on the start of fulfillment",
                                        type: "object",
                                        properties: {
                                            location: {
                                                description:
                                                    "Describes the location of a runtime object.",
                                                type: "object",
                                                properties: {
                                                    id: {
                                                        type: "string",
                                                    },
                                                    descriptor: {
                                                        description:
                                                            "Describes the description of a real-world object.",
                                                        type: "object",
                                                        properties: {
                                                            name: {
                                                                type: "string",
                                                            },
                                                            code: {
                                                                type: "string",
                                                            },
                                                            symbol: {
                                                                type: "string",
                                                            },
                                                            short_desc: {
                                                                type: "string",
                                                            },
                                                            long_desc: {
                                                                type: "string",
                                                            },
                                                            images: {
                                                                type: "array",
                                                                items: {
                                                                    description:
                                                                        "Image of an object. <br/><br/> A url based image will look like <br/><br/>```uri:http://path/to/image``` <br/><br/> An image can also be sent as a data string. For example : <br/><br/> ```data:js87y34ilhriuho84r3i4```",
                                                                    type: "string",
                                                                },
                                                            },
                                                        },
                                                    },
                                                    gps: {
                                                        description:
                                                            "Describes a gps coordinate",
                                                        type: "string",
                                                        pattern:
                                                            "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$",
                                                    },
                                                    address: {
                                                        description:
                                                            "Describes an address",
                                                        type: "object",
                                                        properties: {
                                                            name: {
                                                                type: "string",
                                                                description:
                                                                    "Name of address if applicable. Example, shop name",
                                                            },
                                                            building: {
                                                                type: "string",
                                                                description:
                                                                    "Name of the building or block",
                                                            },
                                                            street: {
                                                                type: "string",
                                                                description:
                                                                    "Street name or number",
                                                            },
                                                            locality: {
                                                                type: "string",
                                                                description:
                                                                    "Name of the locality, apartments",
                                                            },
                                                            city: {
                                                                type: "string",
                                                                description:
                                                                    "City name",
                                                            },
                                                            state: {
                                                                type: "string",
                                                                description:
                                                                    "State name",
                                                            },
                                                            country: {
                                                                type: "string",
                                                                description:
                                                                    "Country name",
                                                            },
                                                            area_code: {
                                                                type: "string",
                                                                description:
                                                                    "Area code. This can be Pincode, ZIP code or any equivalent",
                                                            },
                                                        },
                                                    },
                                                    city: {
                                                        description:
                                                            "Describes a city",
                                                        type: "object",
                                                        properties: {
                                                            name: {
                                                                type: "string",
                                                                description:
                                                                    "Name of the city",
                                                            },
                                                            code: {
                                                                type: "string",
                                                                description:
                                                                    "Codification of city code will be using the std code of the city e.g. for Bengaluru, city code is 'std:080'",
                                                            },
                                                        },
                                                    },
                                                    state: {
                                                        description:
                                                            "Describes a state.",
                                                        type: "object",
                                                        properties: {
                                                            name: {
                                                                type: "string",
                                                                description:
                                                                    "Name of the state",
                                                            },
                                                            code: {
                                                                type: "string",
                                                                description:
                                                                    "State code as per ISO 3166 Alpha-2 code format",
                                                            },
                                                        },
                                                    },
                                                    time: {
                                                        description:
                                                            "Describes time in its various forms. It can be a single point in time; duration; or a structured timetable of operations",
                                                        type: "object",
                                                        properties: {
                                                            label: {
                                                                type: "string",
                                                            },
                                                            timestamp: {
                                                                type: "string",
                                                                format: "date-time",
                                                            },
                                                            range: {
                                                                type: "object",
                                                                properties: {
                                                                    start: {
                                                                        type: "string",
                                                                        format: "date-time",
                                                                    },
                                                                    end: {
                                                                        type: "string",
                                                                        format: "date-time",
                                                                    },
                                                                },
                                                            },
                                                            days: {
                                                                type: "string",
                                                                description:
                                                                    "comma separated values representing days of the week",
                                                            },
                                                            schedule: {
                                                                description:
                                                                    "Describes a schedule",
                                                                type: "object",
                                                                properties: {
                                                                    frequency: {
                                                                        description:
                                                                            "Describes duration as per ISO8601 format",
                                                                        type: "string",
                                                                    },
                                                                    holidays: {
                                                                        type: "array",
                                                                        items: {
                                                                            type: "string",
                                                                            format: "date-time",
                                                                        },
                                                                    },
                                                                    times: {
                                                                        type: "array",
                                                                        items: {
                                                                            type: "string",
                                                                            format: "date-time",
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            time: {
                                                description:
                                                    "Describes time in its various forms. It can be a single point in time; duration; or a structured timetable of operations",
                                                type: "object",
                                                properties: {
                                                    range: {
                                                        type: "object",
                                                        properties: {
                                                            start: {
                                                                type: "string",
                                                                format: "date-time",
                                                            },
                                                            end: {
                                                                type: "string",
                                                                format: "date-time",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    tags: {
                                        description:
                                            "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
                                        type: "object",
                                        properties: {
                                            code: {
                                                description:
                                                    "The machine-readable name of the tag group. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value. Values outside the allowed values may or may not be ignored by the rendering platform. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
                                                type: "string",
                                            },
                                            name: {
                                                description:
                                                    "A human-readable string describing the heading under which the tags are to be displayed. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using code property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency. As this schema is purely for catalog display purposes, it is not recommended to send this value during `search`.",
                                                type: "string",
                                            },
                                            list: {
                                                description:
                                                    "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
                                                type: "array",
                                                items: {
                                                    description:
                                                        "Describes a tag. This is a simple key-value store which is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
                                                    type: "object",
                                                    properties: {
                                                        code: {
                                                            description:
                                                                "The machine-readable name of the tag. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value.",
                                                            type: "string",
                                                        },
                                                        name: {
                                                            description:
                                                                "The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using the `code` property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency.",
                                                            type: "string",
                                                        },
                                                        value: {
                                                            description:
                                                                "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
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
                        quote: {
                            description: "Describes a quote",
                            type: "object",
                            properties: {
                                price: {
                                    description:
                                        "Describes the price of an item. Allows for domain extension.",
                                    type: "object",
                                    properties: {
                                        currency: {
                                            type: "string",
                                            description:
                                                "ISO 4217 alphabetic currency code e.g. 'INR'",
                                        },
                                        value: {
                                            description:
                                                "Describes a decimal value",
                                            type: "string",
                                            pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                        },
                                        tags: {
                                            description:
                                                "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
                                            type: "object",
                                            properties: {
                                                code: {
                                                    description:
                                                        "The machine-readable name of the tag group. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value. Values outside the allowed values may or may not be ignored by the rendering platform. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
                                                    type: "string",
                                                },
                                                name: {
                                                    description:
                                                        "A human-readable string describing the heading under which the tags are to be displayed. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using code property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency. As this schema is purely for catalog display purposes, it is not recommended to send this value during `search`.",
                                                    type: "string",
                                                },
                                                list: {
                                                    description:
                                                        "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
                                                    type: "array",
                                                    items: {
                                                        description:
                                                            "Describes a tag. This is a simple key-value store which is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
                                                        type: "object",
                                                        properties: {
                                                            code: {
                                                                description:
                                                                    "The machine-readable name of the tag. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value.",
                                                                type: "string",
                                                            },
                                                            name: {
                                                                description:
                                                                    "The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using the `code` property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency.",
                                                                type: "string",
                                                            },
                                                            value: {
                                                                description:
                                                                    "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
                                                                type: "string",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                breakup: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            "@ondc/org/item_id": {
                                                description:
                                                    "This is the most unique identifier of a service item. An example of an Item ID could be the SKU of a product.",
                                                type: "string",
                                            },
                                            "@ondc/org/item_quantity": {
                                                type: "object",
                                                properties: {
                                                    count: {
                                                        type: "integer",
                                                        minimum: 0,
                                                    },
                                                },
                                            },
                                            "@ondc/org/title_type": {
                                                type: "string",
                                            },
                                            item: {
                                                type: "object",
                                                properties: {
                                                    quantity: {
                                                        type: "object",
                                                        properties: {
                                                            available: {
                                                                type: "object",
                                                                properties: {
                                                                    count: {
                                                                        type: "integer",
                                                                        minimum: 0,
                                                                    },
                                                                },
                                                            },
                                                            maximum: {
                                                                type: "object",
                                                                properties: {
                                                                    count: {
                                                                        type: "integer",
                                                                        minimum: 1,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                    tags: {
                                                        description:
                                                            "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
                                                        type: "object",
                                                        properties: {
                                                            code: {
                                                                description:
                                                                    "The machine-readable name of the tag group. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value. Values outside the allowed values may or may not be ignored by the rendering platform. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
                                                                type: "string",
                                                            },
                                                            name: {
                                                                description:
                                                                    "A human-readable string describing the heading under which the tags are to be displayed. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using code property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency. As this schema is purely for catalog display purposes, it is not recommended to send this value during `search`.",
                                                                type: "string",
                                                            },
                                                            list: {
                                                                description:
                                                                    "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
                                                                type: "array",
                                                                items: {
                                                                    description:
                                                                        "Describes a tag. This is a simple key-value store which is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
                                                                    type: "object",
                                                                    properties:
                                                                        {
                                                                            code: {
                                                                                description:
                                                                                    "The machine-readable name of the tag. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value.",
                                                                                type: "string",
                                                                            },
                                                                            name: {
                                                                                description:
                                                                                    "The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using the `code` property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency.",
                                                                                type: "string",
                                                                            },
                                                                            value: {
                                                                                description:
                                                                                    "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
                                                                                type: "string",
                                                                            },
                                                                        },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            title: {
                                                type: "string",
                                            },
                                            price: {
                                                description:
                                                    "Describes the price of an item. Allows for domain extension.",
                                                type: "object",
                                                properties: {
                                                    currency: {
                                                        type: "string",
                                                        description:
                                                            "ISO 4217 alphabetic currency code e.g. 'INR'",
                                                    },
                                                    value: {
                                                        description:
                                                            "Describes a decimal value",
                                                        type: "string",
                                                        pattern:
                                                            "[+-]?([0-9]*[.])?[0-9]+",
                                                    },
                                                    tags: {
                                                        description:
                                                            "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
                                                        type: "object",
                                                        properties: {
                                                            code: {
                                                                description:
                                                                    "The machine-readable name of the tag group. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value. Values outside the allowed values may or may not be ignored by the rendering platform. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
                                                                type: "string",
                                                            },
                                                            name: {
                                                                description:
                                                                    "A human-readable string describing the heading under which the tags are to be displayed. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using code property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency. As this schema is purely for catalog display purposes, it is not recommended to send this value during `search`.",
                                                                type: "string",
                                                            },
                                                            list: {
                                                                description:
                                                                    "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
                                                                type: "array",
                                                                items: {
                                                                    description:
                                                                        "Describes a tag. This is a simple key-value store which is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
                                                                    type: "object",
                                                                    properties:
                                                                        {
                                                                            code: {
                                                                                description:
                                                                                    "The machine-readable name of the tag. The allowed values of this property can be published at three levels namely, a) Core specification, b) industry sector-specific adaptations, and c) Network-specific adaptations. Except core, each adaptation (sector or network) should prefix a unique namespace with the allowed value.",
                                                                                type: "string",
                                                                            },
                                                                            name: {
                                                                                description:
                                                                                    "The human-readable name of the tag. This set by the BPP and rendered as-is by the BAP. Sometimes, the network policy may reserve some names for this property. Values outside the reserved values can be set by the BPP. However,the BAP may choose to rename or even ignore this value and render the output purely using the `code` property, but it is recommended for BAPs to keep the name same to avoid confusion and provide consistency.",
                                                                                type: "string",
                                                                            },
                                                                            value: {
                                                                                description:
                                                                                    "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
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
                                },
                                ttl: {
                                    description:
                                        "Describes duration as per ISO8601 format",
                                    type: "string",
                                },
                            },
                        },
                        payment: {
                            type: "string",
                        },
                    },
                },
            },
        },
        error: {
            description: "Describes an error object",
            type: "object",
            properties: {
                type: {
                    type: "string",
                },
                code: {
                    type: "string",
                    description:
                        "ONDC specific error code. For full list of error codes, refer to docs/drafts/Error Codes.md of this repo",
                },
                path: {
                    type: "string",
                    description:
                        "Path to json schema generating the error. Used only during json schema validation errors",
                },
                message: {
                    type: "string",
                    description: "Human readable message describing the error",
                },
            },
        },
    },
};
