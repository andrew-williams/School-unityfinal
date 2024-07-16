using UnityEngine;
using System.Collections;

public class PortalTrigger : MonoBehaviour {
	
	void OnTriggerEnter( Collider c ) {
		if ( c.gameObject.tag == "Player" )
			Application.LoadLevel("Week02");
		else 
			print("No portal for YOU!");
	}
}
