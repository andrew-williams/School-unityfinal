//var header;
static var waypoints = Array();
var connected = Array();
static var kLineOfSightCapsuleRadius = 0.25;

//FPS Tutorial from the Unity3D site
//uses the current waypoint that the PatrolBot is at
static function FindClosest (pos : Vector3) : AutoWayPoint 
{	
	// The closer two vectors, the larger the dot product will be.
	var closestWayPoint : AutoWayPoint;
	
	//for each waypoint in the array of waypoints it will find the distance between the current position and the position that we are at "pos"
	for (var cur : AutoWayPoint in waypoints)
	{
		var distance = Vector3.Distance(cur.transform.position, pos);
		
		if (distance < 100) //if the bot is less than a 100 meters away
		{
			closestDistance = distance;
			closestWayPoint = cur;
		}
	}
	return closestWayPoint;
}

@ContextMenu ("Update Waypoints")
function UpdateWaypoints () 
{
	RebuildWaypointList();
}

function Awake () 
{
	RebuildWaypointList();
}


// Draw the waypoint pickable gizmo
function OnDrawGizmos () 
{
	Gizmos.DrawIcon (transform.position, "Waypoint.tif");
}

// Draw the waypoint lines only when you select one of the waypoints
function OnDrawGizmosSelected () 
{
	if (waypoints.length == 0)
		RebuildWaypointList();
	for (var p : AutoWayPoint in connected) 
	{
		if (Physics.Linecast(transform.position, p.transform.position)) 
		{
			Gizmos.color = Color.red;
			Gizmos.DrawLine (transform.position, p.transform.position);
		} else 
		{
			Gizmos.color = Color.green;
			Gizmos.DrawLine (transform.position, p.transform.position);
		}
	}
}

function RebuildWaypointList () 
{
	var objects : Object[] = FindObjectsOfType(AutoWayPoint);
	waypoints = Array(objects);
	
	for (var point : AutoWayPoint in waypoints) 
	{
		point.RecalculateConnectedWaypoints();
	}
}

function RecalculateConnectedWaypoints ()
{
	connected = Array();

	for (var other : AutoWayPoint in waypoints) 
	{
		// Don't connect to ourselves
		if (other == this)
			continue;
		
		// Do we have a clear line of sight?
		if (!Physics.CheckCapsule(transform.position, other.transform.position, kLineOfSightCapsuleRadius)) 
		{
			connected.Add(other);
		}
	}	
}