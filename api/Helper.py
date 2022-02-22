def to_dict(obj):
    return {key:value for key, value in obj.__dict__.items() if not key.startswith('__') and not callable(key)}