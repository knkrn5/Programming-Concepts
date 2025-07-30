# **PYDANTIC**

## Serialization and De-serialization

1. **Serialization: -** _model is serialized to a dictionary or JSON._ [🔗 more on serializatin](https://docs.pydantic.dev/latest/concepts/serialization/)

   ```py
   print(class_model.model_dump())
   print(class_model.model_dump_json())
   ```

2. **De-serialization: -** _This means parsing the json or the dict to the class model type_ [🔗more on json parsing](https://docs.pydantic.dev/latest/concepts/json/)

   ```py
   # JSON/Dict → Object
   product = allProductsTypes(**data_dict)  # From dict
   #or
   product = allProductsTypes.model_validate(data_dict)  # using model_validate
   product = allProductsTypes.model_validate_json(json_string)  # From JSON
   ```

   - `**` unpacks the dictionary **`item` into keyword arguments** This part uses Python's `**kwargs(keyword arguments) unpacking` to convert each dictionary (item) into keyword arguments and then instantiates the class (or Pydantic model)
