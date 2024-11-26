class Component:
    def __init__(self, name, type):
        self.name = name
        self.type = type

    def to_dict(self):
        return {
            'name': self.name,
            'type': self.type
        }