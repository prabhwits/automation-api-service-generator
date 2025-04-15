export const on_search = {
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
                    description: "Describes a Seller App catalog",
                    type: "object",
                    properties: {
                        "bpp/descriptor": {
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
                        "bpp/providers": {
                            type: "array",
                            items: {
                                description:
                                    "Describes a service provider. This can be a restaurant, a hospital, a Store etc",
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        description: "Id of the provider",
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
                                    category_id: {
                                        type: "string",
                                        description:
                                            "Category Id of the provider",
                                    },
                                    "@ondc/org/fssai_license_no": {
                                        type: "string",
                                        description:
                                            'FSSAI license no. Mandatory for category_id "F&B"',
                                    },
                                    rating: {
                                        description:
                                            "Rating value given to the object (1 - Poor; 2 - Needs improvement; 3 - Satisfactory; 4 - Good; 5 - Excellent)",
                                        type: "number",
                                        minimum: 1,
                                        maximum: 5,
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
                                    categories: {
                                        type: "array",
                                        items: {
                                            description: "Describes a category",
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    description:
                                                        "Unique id of the category",
                                                },
                                                parent_category_id: {
                                                    type: "string",
                                                    description:
                                                        "Unique id of the parent category",
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
                                                image: {
                                                    description:
                                                        "Image of an object. <br/><br/> A url based image will look like <br/><br/>```uri:http://path/to/image``` <br/><br/> An image can also be sent as a data string. For example : <br/><br/> ```data:js87y34ilhriuho84r3i4```",
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
                                    creds: {
                                        type: "array",
                                        items: {
                                            description:
                                                "Describes a credential of an entity - Person or Organization",
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
                                                url: {
                                                    description:
                                                        "URL of the credential",
                                                    type: "string",
                                                    format: "uri",
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
                                            },
                                        },
                                    },
                                    locations: {
                                        type: "array",
                                        items: {
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
                                    },
                                    offers: {
                                        type: "array",
                                        items: {
                                            description: "Describes an offer",
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
                                                location_ids: {
                                                    type: "array",
                                                    items: {
                                                        type: "string",
                                                    },
                                                },
                                                category_ids: {
                                                    description:
                                                        "Categories this item can be listed under",
                                                    type: "array",
                                                    items: {
                                                        type: "string",
                                                        description:
                                                            "Unique id of the category",
                                                    },
                                                },
                                                item_ids: {
                                                    type: "array",
                                                    items: {
                                                        description:
                                                            "This is the most unique identifier of a service item. An example of an Item ID could be the SKU of a product.",
                                                        type: "string",
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
                                                parent_item_id: {
                                                    description:
                                                        "This is the most unique identifier of a service item. An example of an Item ID could be the SKU of a product.",
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
                                                        maximum_value: {
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
                                                quantity: {
                                                    description:
                                                        "Describes count or amount of an item",
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
                                                        unitized: {
                                                            description:
                                                                "This represents the quantity available in a single unit of the item",
                                                            type: "object",
                                                            properties: {
                                                                count: {
                                                                    type: "integer",
                                                                    minimum: 1,
                                                                    maximum: 1,
                                                                },
                                                                measure: {
                                                                    properties:
                                                                        {
                                                                            unit: {
                                                                                type: "string",
                                                                            },
                                                                            value: {
                                                                                type: "string",
                                                                            },
                                                                        },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                                category_id: {
                                                    type: "string",
                                                    description:
                                                        "Unique id of the category",
                                                },
                                                category_ids: {
                                                    description:
                                                        "Categories this item can be listed under",
                                                    type: "array",
                                                    items: {
                                                        type: "string",
                                                        description:
                                                            "Unique id of the category",
                                                    },
                                                },
                                                fulfillment_id: {
                                                    type: "string",
                                                    description:
                                                        "Unique reference ID to the fulfillment of an order",
                                                },
                                                fulfillment_ids: {
                                                    type: "array",
                                                    properties: {
                                                        id: {
                                                            type: "string",
                                                            description:
                                                                "Unique reference ID to the fulfillment of an order",
                                                        },
                                                    },
                                                },
                                                replacement_terms: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            replace_within: {
                                                                type: "object",
                                                                properties: {
                                                                    duration: {
                                                                        type: "string",
                                                                        description:
                                                                            "The duration within which the item can be replaced",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                                rating: {
                                                    description:
                                                        "Rating value given to the object (1 - Poor; 2 - Needs improvement; 3 - Satisfactory; 4 - Good; 5 - Excellent)",
                                                    type: "number",
                                                    minimum: 1,
                                                    maximum: 5,
                                                },
                                                location_id: {
                                                    type: "string",
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
                                                related: {
                                                    type: "boolean",
                                                },
                                                recommended: {
                                                    type: "boolean",
                                                },
                                                "@ondc/org/returnable": {
                                                    description:
                                                        "whether the item is returnable",
                                                    type: "boolean",
                                                },
                                                "@ondc/org/seller_pickup_return":
                                                    {
                                                        description:
                                                            "in case of return, whether the item should be picked up by seller",
                                                        type: "boolean",
                                                    },
                                                "@ondc/org/return_window": {
                                                    description:
                                                        'return window for the item in ISO8601 durations format e.g. \'PT24H\' indicates 24 hour return window. Mandatory if "@ondc/org/returnable" is "true"',
                                                    type: "string",
                                                },
                                                "@ondc/org/cancellable": {
                                                    description:
                                                        "whether the item is cancellable",
                                                    type: "boolean",
                                                },
                                                "@ondc/org/time_to_ship": {
                                                    description:
                                                        "time from order confirmation by which item ready to ship in ISO8601 durations format (e.g. 'PT30M' indicates item ready to ship in 30 mins). Mandatory for category_id \"F&B\"",
                                                    type: "string",
                                                },
                                                "@ondc/org/available_on_cod": {
                                                    description:
                                                        "whether the catalog item is available on COD",
                                                    type: "boolean",
                                                },
                                                "@ondc/org/contact_details_consumer_care":
                                                    {
                                                        description:
                                                            "contact details for consumer care",
                                                        type: "string",
                                                    },
                                                "@ondc/org/statutory_reqs_packaged_commodities":
                                                    {
                                                        type: "object",
                                                        description:
                                                            'mandatory for category_id "Packaged Commodities"',
                                                        properties: {
                                                            common_or_generic_name_of_commodity:
                                                                {
                                                                    description:
                                                                        "common or generic name of commodity",
                                                                    type: "string",
                                                                },
                                                            month_year_of_manufacture_packing_import:
                                                                {
                                                                    description:
                                                                        "month and year of manufacture or packing or import",
                                                                    type: "string",
                                                                },
                                                            manufacturer_or_packer_name:
                                                                {
                                                                    description:
                                                                        "name of manufacturer or packer (in case manufacturer is not the packer) or name of importer for imported goods",
                                                                    type: "string",
                                                                },
                                                            manufacturer_or_packer_address:
                                                                {
                                                                    description:
                                                                        "address of manufacturer or packer (in case manufacturer is not the packer) or address of importer for imported goods",
                                                                    type: "string",
                                                                },
                                                            mfg_license_no: {
                                                                description:
                                                                    "manufacturing license no",
                                                                type: "string",
                                                            },
                                                            multiple_products_name_number_or_qty:
                                                                {
                                                                    description:
                                                                        'for packages with multiple products, the name and number of quantity of each (can be shown as "name1-number_or_quantity; name2-number_or_quantity..")',
                                                                    type: "string",
                                                                },
                                                            net_quantity_or_measure_of_commodity_in_pkg:
                                                                {
                                                                    description:
                                                                        "net quantity of commodity in terms of standard unit of weight or measure of commodity contained in package",
                                                                    type: "string",
                                                                },
                                                            expiry_date: {
                                                                description:
                                                                    "month and year of expiry",
                                                                type: "string",
                                                            },
                                                        },
                                                    },
                                                "@ondc/org/statutory_reqs_prepackaged_food":
                                                    {
                                                        type: "object",
                                                        description:
                                                            'mandatory for category_id "Packaged food"',
                                                        properties: {
                                                            nutritional_info: {
                                                                description:
                                                                    'nutritional info (can be shown as nutritional info (with unit, per standard unit, per serving);..) e.g. "Energy(KCal) - (per 100kg) 420, (per serving 50g) 250; Protein(g) - (per 100kg) 12, (per serving 50g)6;.."',
                                                                type: "string",
                                                            },
                                                            additives_info: {
                                                                description:
                                                                    "food additives together with specific name or recognized International Numbering System (can be shown as additive1-name or number;additive2-name or number;..)",
                                                                type: "string",
                                                            },
                                                            brand_owner_FSSAI_license_no:
                                                                {
                                                                    description:
                                                                        "FSSAI license no of brand owner",
                                                                    type: "string",
                                                                },
                                                            other_FSSAI_license_no:
                                                                {
                                                                    description:
                                                                        "FSSAI license no of manufacturer or marketer or packer or bottler if different from brand owner",
                                                                    type: "string",
                                                                },
                                                            importer_FSSAI_license_no:
                                                                {
                                                                    description:
                                                                        "FSSAI license no of importer",
                                                                    type: "string",
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
                                    ttl: {
                                        type: "string",
                                        description:
                                            "Validity of catalog in ISO8601 durations format after which it has to be refreshed e.g. 'P7D' indicates validity of 7 days; value of 0 indicates catalog is not cacheable",
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
                        "bpp/fulfillments": {
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
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
