# Variable declaration
GENDER_CHOICES = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('others', 'Others')
)

DEMOGRAPHIC_CHOICES = {
    ('1', 'Province 1'): (
        ('dolakha', 'Dolakha'),),
    ('2', 'Province 2'): (
        ('bhaktapur', 'Bhaktapur'),),
    ('3', 'Bagmati'): (
        ('kathmandu', 'Kathmandu'),),
    ('4', 'Gandaki'): (
        ('lalitpur', 'Lalitpur'),),
    ('5', 'Province 5'): (
        ('ramechhap', 'Ramechhap'),),
    ('6', 'Karnali'): (
        ('gorkha', 'Gorkha')),
    ('7', 'Sudurpashchim'): (
        ('makawanpur', 'Makawanpur'))
}

PROVINCE_CHOICES = (
    ('1', 'Province 1'),
    ('2', 'Province 2'),
    ('3', 'Bagmati'),
    ('4', 'Gandaki'),
    ('5', 'Province 5'),
    ('6', 'Karnali'),
    ('7', 'Sudurpashchim')
)

DISTRICT_CHOICES = (
    ('dolakha', 'Dolakha'),
    ('bhaktapur', 'Bhaktapur'),
    ('kathmandu', 'Kathmandu'),
    ('lalitpur', 'Lalitpur')
)

genders = dict((x, y) for x, y in GENDER_CHOICES)

province = dict((x, y) for x, y in PROVINCE_CHOICES)

districts = dict((x, y) for x, y in DISTRICT_CHOICES)
