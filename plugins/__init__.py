"""Plugin system initialization"""

# Plugin registry
PLUGINS = {}

def register_plugin(name: str, plugin_class):
    """Register a plugin"""
    PLUGINS[name] = plugin_class

def get_plugin(name: str):
    """Get registered plugin"""
    return PLUGINS.get(name)
