static var health:int = 100;
static var enemy:String;
static var alive:boolean = true;

function OnGUI()
{
	if(alive) {
		GUI.color = Color.green;
		GUI.Label(Rect(100,100,100,50),health.ToString());
	}
	else {
		GUI.color = Color.red;
		GUI.Label(Rect(100,100,300,50),"YOU ARE DEAD");
	}
}

static function UpdateHealth(amount:int)
{
	health += amount;
	if ( health <= 0 )
		alive = false;
}