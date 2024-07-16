using UnityEngine;
using System.Collections;

public class WaterTrigger : MonoBehaviour {
	public Transform splash;
	MasterControl _mc;

	void Start() {
		_mc = GameObject.Find("ControlCenter").GetComponent<MasterControl>();
	}
	
	void OnTriggerEnter( Collider c ) {
		print("Entered water!");
		_mc.ChangeTrackTo(2);
		Transform tempSplash = Instantiate(splash, c.transform.position, Quaternion.identity) as Transform;
		Destroy( tempSplash.gameObject, 1.5f );
	}
	
	void OnTriggerExit( Collider c ) {
		print("Exited water!");
		_mc.ChangeTrackTo(1);
		Transform tempSplash = Instantiate(splash, c.transform.position, Quaternion.identity) as Transform;
		Destroy( tempSplash.gameObject, 1.5f );
	}
}
