### Your project idea

MVP:
eCapr is an online tool/widget used by sports gambling enthusiasts to track their betting performance. The app allows the user to input individual bet/wager data when a bet is made, whereby the user will provide the result of the bet previously inputted. The website will feature a dashboard which includes graphs, and insightful data on a user's betting performance (performance based on bet type, sport type, etc.) This app is particularly useful as opposed to other betting trackers/loggers as it will provide data that showcases the areas of strengths within a bettor's strategy (also large betting companies/casinos do not like it when you win money so they would never offer this functionality).

### Your tech stack (frontend, backend, database)

tech stack:

- django - backend
- react.js - frontend
- postgresql - database

additional tech:

- fontAwesome
- animate.css
- d3.js

### List of backend models and their properties

#### Model example:

```
class Bet(models.Model):
    bookmaker = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    odds = models.IntegerField()
    bet_type = models.CharField(max_length=75)
    event_finish = models.DateField(default=datetime.date.today())
    wager = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    sport = models.CharField(max_length=50)
    league = models.CharField(max_length=50)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)
    notes = models.TextField()
    date_placed = models.DateTimeField(auto_now_add=True, auto_now=False)
    date_resolved = models.DateTimeField(auto_now_add=False, auto_now=True)
    resolved = models.BooleanField()
    bet_result = models.CharField(max_length=10, default='None')
    pot_win = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    profit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


    def __str__(self):
        return self.name

class User(AbstractUser):
    email = models.EmailField(verbose_name='email', max_length=255,
                              unique=True)
    username = models.CharField(max_length=100)
    wins = models.IntegerField()
    losses = models.IntegerField()
    pushes = models.IntegerField()
    REQUIRED_FIELDS = [username, email, wins, losses, pushes]
    USERNAME_FIELD = 'username'

    def get_username(self):
        return self.username

```

#### Post-MVP model notes:

- add Post model with Bet model foreignKey.
- add parlay functionality to existing bet model or add new Parlay model (a series of bets)

### React component hierarchy

![Screen Shot 2022-04-08 at 10 47 49 AM](https://media.git.generalassemb.ly/user/41401/files/605ea400-b729-11ec-962a-5f7f697fa9e5)

### User stories

As a user, I want to be able to log in to the page so that I can have a personal betting dashboard with my own personal data.
As a user, I want to be able to input my individual bet data so that I can keep track of my outstanding wagers.
As a user, I want to be able to see a log of all the bets that are outstanding (not resolved) and resolved, so that I can see how what events I have wagered money on.
As a user, I want all of my betting data to persist on my account, so that I can track my betting performance over time.
As a user, I want to see a visual representation of my betting performance, so that I can adjust my strategy according to my previous performance and strengths.

### Wireframes

<img width="1029" alt="Screen Shot 2022-04-08 at 9 42 52 AM" src="https://media.git.generalassemb.ly/user/41401/files/6785b200-b729-11ec-9b6b-ffd6980a0179">
<img width="1030" alt="Screen Shot 2022-04-08 at 9 55 11 AM" src="https://media.git.generalassemb.ly/user/41401/files/681e4880-b729-11ec-92c8-feab63e1bfe2">
<img width="1030" alt="Screen Shot 2022-04-08 at 9 49 24 AM" src="https://media.git.generalassemb.ly/user/41401/files/68b6df00-b729-11ec-8b8f-4df9ec81f467">
<img width="1028" alt="Screen Shot 2022-04-08 at 9 47 30 AM" src="https://media.git.generalassemb.ly/user/41401/files/694f7580-b729-11ec-8d2f-f258dd4a31a4">
