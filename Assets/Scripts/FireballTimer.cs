using UnityEngine;
using System.Collections;

public class FireballTimer : MonoBehaviour {

	//public Rigidbody projectile;  //what i want to create
	//public Transform bulletSpawnPoint; //where to create the object
	public float fireInterval = 5.0f;
	private float fireTime;
	
	// Use this for initialization
	void Start () {
		fireTime = Time.time;
	}
	
	// Update is called once per frame
	void Update () 
	{
		if( Time.time >= fireTime + fireInterval )
		{
			Debug.Log("Fire!"+Time.time);
			/* Rigidbody tempProjectile = Instantiate(projectile, bulletSpawnPoint.position, bulletSpawnPoint.rotation) as Rigidbody;	
			tempProjectile.AddRelativeForce(new Vector3(0,0,3), ForceMode.Impulse);
			Physics.IgnoreCollision(tempProjectile.collider,bulletSpawnPoint.root.collider); */
			fireTime = Time.time;
		}	
	}
}