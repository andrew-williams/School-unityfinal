using UnityEngine;
using System.Collections;

public class WaterTriggerW4 : MonoBehaviour {
	HealthManager _hm;

	void Start() {
		_hm = GameObject.Find("ControlCenter").GetComponent<HealthManager>();
	}
	
	void OnTriggerEnter( Collider c ) {
		StartCoroutine( "DoDamage" );
	}
	
	void OnTriggerExit( Collider c ) {
		StopCoroutine( "DoDamage" );
	}
	
	IEnumerator DoDamage( ) {
		while (true) {
			_hm.health--;
			if ( _hm.health == 0 ) {
				StopAllCoroutines();
			}
			yield return new WaitForSeconds(1);
		}
	}
}
