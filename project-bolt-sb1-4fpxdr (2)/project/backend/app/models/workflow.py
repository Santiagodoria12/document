class Workflow:
    def __init__(self, name, components):
        self.name = name
        self.components = components

    def to_dict(self):
        return {
            'name': self.name,
            'components': self.components
        }