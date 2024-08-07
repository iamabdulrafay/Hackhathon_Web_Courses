"""
WSGI config for beckend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Determine the settings module based on environment variable
settings_module = 'beckend.deployment' if 'WEBSITE_HOSTNAME' in os.environ else 'beckend.settings'

# Set the default settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

# Get the WSGI application
application = get_wsgi_application()
