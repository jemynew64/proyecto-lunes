# tienda/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, username, name, surname, email, role='usuario', password=None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        if not username:
            raise ValueError('El usuario debe tener un nombre de usuario')
        
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            name=name,
            surname=surname,
            email=email,
            role=role
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, name, surname, email, password):
        user = self.create_user(
            username=username,
            name=name,
            surname=surname,
            email=email,
            password=password,
            role='administrador'
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    class Role(models.TextChoices):
        ADMINISTRADOR = 'administrador', _('Administrador')
        USUARIO = 'usuario', _('Usuario')

    username = models.CharField("nombre para logearte", unique=True, max_length=100)
    name = models.CharField("Name", max_length=200, blank=True, null=True)
    surname = models.CharField("Surname", max_length=200, blank=True, null=True)
    email = models.EmailField("Email", max_length=255, unique=True, blank=True, null=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USUARIO)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'surname', 'email']

    def __str__(self):
        return f"{self.username} ({self.role})"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    
class Anime(models.Model):
    title = models.CharField(max_length=45)
    author = models.CharField(max_length=45)
    pub_year = models.CharField(max_length=45)
    description = models.TextField()
    img_route = models.ImageField(upload_to="images/", blank=True, null=True)

    class Meta:
        db_table = "Anime"

    def __str__(self):
        return self.title

class UserAnimeFavorites(models.Model):
    idUsuario = models.ForeignKey(User, on_delete=models.CASCADE)
    idAnime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    is_favorite = models.BooleanField()

    class Meta:
        db_table = 'UserAnimeFavorites'
        unique_together = ('idUsuario', 'idAnime')


    def __str__(self):
        return f'{self.idUsuario} - {self.idAnime.title}'
    
class Category(models.Model):
    name = models.CharField(max_length=80)
    img_route = models.ImageField(upload_to="images/", blank=True, null=True)

    class Meta:
        db_table = 'Category'

    def __str__(self):
        return self.name
    
class AnimeCategories(models.Model):
    idAnime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    idCategory = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = "AnimeCategories"

class Subscription(models.Model):
    # idSubscription = models.AutoField(primary_key=True)
    name = models.CharField(max_length=80)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    typeSubscription = models.CharField(max_length=45)

    class Meta:
        db_table = "Subscription"

    def __str__(self):
        return self.name
    
class UserSubscription(models.Model):
    idUser = models.ForeignKey(User, on_delete=models.CASCADE)
    idSubscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    subscriptionDate = models.DateTimeField()
    terminationDate = models.DateTimeField()
    activeStatus = models.BooleanField()
    
    class Meta:
        db_table = "UserSubscription"

    def __str__(self):
        return f"{self.user} - {self.subscription}"
