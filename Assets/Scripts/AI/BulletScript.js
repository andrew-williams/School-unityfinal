static var playerShooting : GameObject;

function Start()
{
	Destroy(gameObject, 3.0);
}

function OnCollisionEnter( c:Collision )
{
	if( c.gameObject.tag == "Player" )
	{
		Destroy(gameObject);
	}
	
	if( c.gameObject.GetComponent("Health") ) //looks for the game component Health
	{
		//Health.enemy = playerShooting.name;
		Health.UpdateHealth(-10);
	}
}