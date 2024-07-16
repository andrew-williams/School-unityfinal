using UnityEngine;
using System.Collections;

public class BulletSpawnBasic : MonoBehaviour {
	public float shootForce = 1000.0f;
	public Transform bulletPrefab; // Template link in Project.
	
	void Start () {
		Screen.showCursor = false;
	}
	
	void Update () {
		if ( Input.GetButtonDown("Fire1") ) { // Single shot.
			SpawnBullet();
		}
		if ( Input.GetButton("Fire2") ) { // Rapid fire.
			SpawnBullet();
		}
	}
	
	void SpawnBullet() {
		Transform instanceBullet; // Physical object in world.
		instanceBullet = Instantiate( bulletPrefab, transform.position, Quaternion.identity ) as Transform;
		instanceBullet.rigidbody.AddForce( transform.forward * shootForce );
	}
}
