using UnityEngine;
using System.Collections;

public class FireballFixed : MonoBehaviour {

	public Rigidbody projectile;  //what i want to create
	public Transform bulletSpawnPoint; //where to create the object
	public static bool ready = false;

	// Use this for initialization
	void Start () {
		StartCoroutine(Reload());
	}
	
	// Update is called once per frame
	void Update () 
	{
		if(ready == true)
		{
			Debug.Log("Fire!"+Time.time);
			Rigidbody tempProjectile = Instantiate(projectile, bulletSpawnPoint.position, bulletSpawnPoint.rotation) as Rigidbody;	
			tempProjectile.AddRelativeForce(new Vector3(0,0,3), ForceMode.Impulse);
			Physics.IgnoreCollision(tempProjectile.collider,bulletSpawnPoint.root.collider);
			ready = false;
		}	
	}
		
	IEnumerator Reload()
    {	
		while (true) {
			Debug.Log("Check2");
			yield return new WaitForSeconds(5.0f);
			Debug.Log("Check3");
			ready = true;
		}
    }
}