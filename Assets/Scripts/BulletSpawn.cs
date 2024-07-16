using UnityEngine;
using System.Collections;

public class BulletSpawn : MonoBehaviour {
	public GUIText ammoText;
	public GUITexture ammoBar;
	public Transform bulletPrefab;
	public Transform flashPrefab;
	public Transform hitWall;
	public Transform laserSpawn;
	
	int ammoCnt = 16;
	int barWidth = 128;
	float shootForce = 1000.0f;
	LineRenderer lineRenderer;
	GameObject gunObj;
	Vector3 mfScales;
	
	void Start() {
		lineRenderer = GetComponent<LineRenderer>();
		gunObj = GameObject.Find("GunPrefab");
		mfScales = flashPrefab.transform.localScale;
	}
	
	void Update () {
		if ( ammoCnt > 0 ) {
			if ( Input.GetButtonDown("Fire1") ) {
				Transform instanceBullet;
				Transform instanceFlash;
				instanceBullet = Instantiate( bulletPrefab, transform.position, Quaternion.identity ) as Transform;
				instanceBullet.rigidbody.AddForce( transform.forward * shootForce );
				instanceFlash = Instantiate( flashPrefab, transform.position, transform.rotation ) as Transform;
				instanceFlash.transform.parent = transform;
				instanceFlash.transform.localScale = new Vector3( mfScales.x * RandMF(), mfScales.y * RandMF(), mfScales.z * RandMF() );
				instanceFlash.transform.eulerAngles = new Vector3( instanceFlash.transform.eulerAngles.x, instanceFlash.transform.eulerAngles.y , Random.Range( 0, 36 ) );
				Physics.IgnoreCollision(instanceBullet.collider, hitWall.collider);
				ammoCnt -= 1;
				ammoText.text = "Ammo: "+ammoCnt;
				barWidth -= 8;
				ammoBar.pixelInset = new Rect(-64, -8, barWidth, 16);
				Destroy( instanceFlash.gameObject, 0.1f );
			}
		}
		if ( Input.GetButton("Fire2") ) {
			lineRenderer.enabled = true;
			lineRenderer.SetPosition(0, laserSpawn.position);
			lineRenderer.SetPosition(1, gunObj.GetComponent<GunLook>().lookTarget);	
		}
		if ( Input.GetButtonUp("Fire2") ) {
			lineRenderer.enabled = false;
		}
		if ( Input.GetKeyDown("r") ) {
			ammoCnt = 16;
			ammoText.text = "Ammo: "+ammoCnt;
			barWidth = 128;
			ammoBar.pixelInset = new Rect(-64, -8, barWidth, 16);
		}
	}
	
	float RandMF() {
		return Random.Range( 0.75f, 1.5f );
	}	
}
