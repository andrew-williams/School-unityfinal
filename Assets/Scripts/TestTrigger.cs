using UnityEngine;
using System.Collections;

public class TestTrigger : MonoBehaviour {
	
	void OnTriggerEnter( Collider c ) {
		if ( c.gameObject.tag == "Player" )
			Application.LoadLevel("Week04B");
		else 
			print("No portal for YOU!");
	}
}
