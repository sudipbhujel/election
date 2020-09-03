import time

from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError


class Command(BaseCommand):
    """Django command to pause execution until database is available"""

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Waiting for database...'))
        db_conn = None
        while not db_conn:
            try:
                db_conn = connections['default']
            except OperationalError:
                self.stdout.write(self.style.ERROR(
                    'X Database unavailabe, waiting 1 second...'
                ))
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('✔ Database available!'))
