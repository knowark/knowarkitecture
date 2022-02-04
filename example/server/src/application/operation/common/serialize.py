def dump(item):
    result  = vars(item)
    result["transitions"] = [

            {"status":  key, **item.transitions[key]}
                for key in item.transitions
        ]
    return result
