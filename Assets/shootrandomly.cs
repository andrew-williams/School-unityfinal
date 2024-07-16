using UnityEngine;
using System.Collections;

public class shootrandomly : MonoBehaviour {
	
	private Vector3 pos;
	public int tts;
	private const int FPS = 60;
	
	Transform entityPrefab;
	Transform barrel;
	
	// Use this for initialization
	void Start () {
		tts = Random.Range(0,2) * Random.Range (0,FPS);
	}
	
	// Update is called once per frame
	void Update () {
		if (tts > 0){
			tts = tts - 1;
		}
		else{
			Shoot ();
			tts = Random.Range(0,2) * Random.Range (0,FPS);
		}
	}
	
	void Shoot(){
		//Debug.Log ("Code here to shoot player");	
	}
	void OnCollisionEnter (Collision collider)
    {
		GameObject.Destroy(gameObject);
    }
}
