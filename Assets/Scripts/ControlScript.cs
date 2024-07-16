using UnityEngine;
using System.Collections;

public class ControlScript : MonoBehaviour {
	public GameObject gameCamera;
	public GameObject menuCamera;
	private GameObject bulletSpawn;
	private BulletSpawn bulletScript;
	
	int gameState = 0;
	
	void Awake() {
		bulletSpawn = GameObject.Find("BulletSpawn");
		bulletScript = bulletSpawn.GetComponent<BulletSpawn>();
		bulletScript.ammoBar.enabled = false;
		bulletScript.ammoText.enabled = false;
		bulletSpawn.SetActive(false);
	}
	
	void OnGUI() {
		if ( gameState == 0 ) {
			if ( GUI.Button(new Rect(Screen.width/2 -150,Screen.height/2 -150,300,100), "Start Game") ) {
				gameCamera.SetActive(true);
				menuCamera.SetActive(false);
				bulletSpawn.SetActive(true);
				bulletScript.ammoBar.enabled = true;
				bulletScript.ammoText.enabled = true;
				gameState = 1;
			}
			if ( GUI.Button(new Rect(Screen.width/2 - 150,	Screen.height/2-25,300,100), "Quit Game") )
				Application.Quit();
		}
		else {
			// Add gui elements for in-game mode.
		}
	}
}
